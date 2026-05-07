import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const uuidSchema = z.uuid();
const intSchema = z.coerce.number().int().positive();

type RelayResult = {
  data: unknown;
  status: number;
};

type ErrorPayload = {
  code: string;
  message: string;
  details?: unknown;
};

const TIMESTAMP = () => new Date().toISOString();

export const runtime = "nodejs";

export function getRequestId(request: NextRequest): string {
  return request.headers.get("x-request-id") ?? crypto.randomUUID();
}

export function ensureBackendBaseUrl(requestId: string): NextResponse | null {
  if (process.env.BACKEND_API_BASE_URL) {
    console.log(`[BFF] Request ${requestId} using BACKEND_API_BASE_URL:`, 
      process.env.BACKEND_API_BASE_URL);
    return null;
  }

  console.error(`[BFF] Request ${requestId} missing BACKEND_API_BASE_URL`);
  return failure(
    {
      code: "CONFIG_ERROR",
      message: "BACKEND_API_BASE_URL is missing.",
    },
    500,
    requestId,
  );
}

export function forwardedHeaders(request: NextRequest): HeadersInit {
  const headers = new Headers();
  const authorization = request.headers.get("authorization");
  const userAgent = request.headers.get("user-agent");

  if (authorization) {
    headers.set("authorization", authorization);
  }

  if (userAgent) {
    headers.set("user-agent", userAgent);
  }

  headers.set("x-request-id", getRequestId(request));

  return headers;
}

export async function parseJsonBody(
  request: NextRequest,
): Promise<{ value?: Record<string, unknown>; error?: NextResponse }> {
  try {
    const body = (await request.json()) as unknown;
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return {
        error: failure(
          {
            code: "INVALID_BODY",
            message: "Request body must be a JSON object.",
          },
          400,
          getRequestId(request),
        ),
      };
    }

    return { value: body as Record<string, unknown> };
  } catch {
    return {
      error: failure(
        {
          code: "INVALID_JSON",
          message: "Malformed JSON body.",
        },
        400,
        getRequestId(request),
      ),
    };
  }
}

export async function parseJsonBodyAs<T extends object>(
  request: NextRequest,
): Promise<{ value?: T; error?: NextResponse }> {
  const parsed = await parseJsonBody(request);
  if (parsed.error || !parsed.value) {
    return { error: parsed.error };
  }

  return { value: parsed.value as unknown as T };
}

export async function parseMultipartBody(
  request: NextRequest,
): Promise<{ value?: Record<string, unknown>; error?: NextResponse }> {
  try {
    const formData = await request.formData();
    return { value: formDataToObject(formData) };
  } catch {
    return {
      error: failure(
        {
          code: "INVALID_MULTIPART",
          message: "Malformed multipart form data.",
        },
        400,
        getRequestId(request),
      ),
    };
  }
}

export async function parseMultipartBodyAs<T extends object>(
  request: NextRequest,
): Promise<{ value?: T; error?: NextResponse }> {
  const parsed = await parseMultipartBody(request);
  if (parsed.error || !parsed.value) {
    return { error: parsed.error };
  }

  return { value: parsed.value as unknown as T };
}

export function parseEnumValue<T extends Record<string, string>>(
  enumRecord: T,
  value: string | null,
): T[keyof T] | undefined {
  if (!value) {
    return undefined;
  }

  const values = Object.values(enumRecord) as Array<T[keyof T]>;
  return values.includes(value as T[keyof T])
    ? (value as T[keyof T])
    : undefined;
}

function formDataToObject(formData: FormData): Record<string, unknown> {
  const result: Record<string, unknown> = {};

  for (const [key, value] of formData.entries()) {
    const normalizedValue: unknown = typeof value === "string" ? value : value;

    if (key in result) {
      const previous = result[key];
      if (Array.isArray(previous)) {
        previous.push(normalizedValue);
      } else {
        result[key] = [previous, normalizedValue];
      }
      continue;
    }

    result[key] = normalizedValue;
  }

  return result;
}

export function parseUuid(
  value: string,
  name: string,
  requestId: string,
): NextResponse | null {
  const parsed = uuidSchema.safeParse(value);
  if (parsed.success) {
    return null;
  }

  return failure(
    {
      code: "INVALID_PARAM",
      message: `${name} must be a valid UUID.`,
      details: parsed.error.flatten(),
    },
    400,
    requestId,
  );
}

export function parseOptionalInt(
  value: string | null,
  name: string,
  requestId: string,
): { value?: number; error?: NextResponse } {
  if (!value) {
    return {};
  }

  const parsed = intSchema.safeParse(value);
  if (parsed.success) {
    return { value: parsed.data };
  }

  return {
    error: failure(
      {
        code: "INVALID_QUERY",
        message: `${name} must be a positive integer.`,
        details: parsed.error.flatten(),
      },
      400,
      requestId,
    ),
  };
}

export function success(
  data: unknown,
  status: number,
  requestId: string,
): NextResponse {
  return NextResponse.json(
    {
      success: true,
      data,
      error: null,
      meta: {
        requestId,
        timestamp: TIMESTAMP(),
      },
    },
    { status },
  );
}

export function failure(
  error: ErrorPayload,
  status: number,
  requestId: string,
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      data: null,
      error,
      meta: {
        requestId,
        timestamp: TIMESTAMP(),
      },
    },
    { status },
  );
}

export function relay(result: RelayResult, requestId: string): NextResponse {
  console.log(`[BFF] Request ${requestId} relay result:`, {
    status: result.status,
    dataType: typeof result.data,
  });

  if (result.status >= 200 && result.status < 300) {
    return success(result.data, result.status, requestId);
  }

  const errorMsg = extractBackendMessage(result.data);
  console.error(`[BFF] Request ${requestId} backend error:`, {
    status: result.status,
    message: errorMsg,
  });

  return failure(
    {
      code: "BACKEND_ERROR",
      message: errorMsg,
      details: result.data,
    },
    result.status,
    requestId,
  );
}

export function handleUnknownError(
  error: unknown,
  requestId: string,
): NextResponse {
  const message =
    error instanceof Error ? error.message : "Unexpected server error.";

  console.error(`[BFF] Request ${requestId} error:`, {
    message,
    stack: error instanceof Error ? error.stack : undefined,
  });

  return failure(
    {
      code: "INTERNAL_ERROR",
      message,
    },
    500,
    requestId,
  );
}

function extractBackendMessage(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "Backend request failed.";
  }

  const message = (data as { message?: unknown }).message;
  if (typeof message === "string" && message.length > 0) {
    return message;
  }

  return "Backend request failed.";
}
