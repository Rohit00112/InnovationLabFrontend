import "server-only";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { getAccessTokenFromRequest } from "@/lib/auth/session";

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
    console.log(
      `[BFF] Request ${requestId} using BACKEND_API_BASE_URL:`,
      process.env.BACKEND_API_BASE_URL,
    );
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

export type SegmentRouteContext = {
  params: Promise<{ segments?: string[] }>;
};

export type SegmentRouteHandler = (args: {
  request: NextRequest;
  requestId: string;
  segments: string[];
}) => Promise<NextResponse>;

export async function withSegmentRoute(
  request: NextRequest,
  context: SegmentRouteContext,
  handler: SegmentRouteHandler,
): Promise<NextResponse> {
  const requestId = getRequestId(request);
  const envError = ensureBackendBaseUrl(requestId);
  if (envError) {
    return envError;
  }

  const segments = (await context.params).segments ?? [];

  try {
    return await handler({ request, requestId, segments });
  } catch (error) {
    return handleUnknownError(error, requestId);
  }
}

export function forwardedHeaders(request: NextRequest): HeadersInit {
  const headers = new Headers();
  const authorization = request.headers.get("authorization");
  const userAgent = request.headers.get("user-agent");
  const accessToken = getAccessTokenFromRequest(request);

  if (authorization) {
    headers.set("authorization", authorization);
  } else if (accessToken) {
    headers.set("authorization", `Bearer ${accessToken}`);
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

  return { value: parsed.value as T };
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

  return { value: parsed.value as T };
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

export function getQueryParamValue(
  request: NextRequest,
  name: string,
  ...aliases: string[]
): string | null {
  for (const candidate of [name, ...aliases]) {
    const value = request.nextUrl.searchParams.get(candidate);
    if (value && value.length > 0) {
      return value;
    }
  }

  return null;
}

function formDataToObject(formData: FormData): Record<string, unknown> {
  const result: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    const normalizedValue = value;

    // Handle nested keys like Members[0].name
    if (key.includes("[") || key.includes(".")) {
      const parts = key.split(/[.[\]]+/).filter(Boolean);
      let current = result;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLast = i === parts.length - 1;

        if (isLast) {
          current[part] = normalizedValue;
        } else {
          const nextPart = parts[i + 1];
          const isNextNumber = !isNaN(Number(nextPart));
          if (!current[part]) {
            current[part] = isNextNumber ? [] : {};
          }
          current = current[part];
        }
      }
    } else {
      if (key in result) {
        if (Array.isArray(result[key])) {
          result[key].push(normalizedValue);
        } else {
          result[key] = [result[key], normalizedValue];
        }
      } else {
        result[key] = normalizedValue;
      }
    }
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
  const isProduction = process.env.NODE_ENV === "production";
  const payload: any = {
    success: false,
    data: null,
    error,
    meta: {
      requestId,
      timestamp: TIMESTAMP(),
    },
  };

  if (isProduction && payload.error) {
    delete payload.error.details;
  }

  return NextResponse.json(payload, { status });
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

  const isProduction = process.env.NODE_ENV === "production";

  return failure(
    {
      code: "INTERNAL_ERROR",
      message: isProduction ? "Unexpected server error." : message,
    },
    500,
    requestId,
  );
}

function extractBackendMessage(data: unknown): string {
  if (!data || typeof data !== "object") {
    return "Backend request failed.";
  }

  const obj = data as Record<string, unknown>;

  if (typeof obj.message === "string" && obj.message.length > 0) {
    return obj.message;
  }

  if (typeof obj.title === "string" && obj.title.length > 0) {
    let msg = obj.title;
    if (obj.errors && typeof obj.errors === "object") {
      const errorEntries = Object.entries(obj.errors);
      if (errorEntries.length > 0) {
        const [field, messages] = errorEntries[0];
        const firstMessage = Array.isArray(messages) ? messages[0] : messages;
        msg += `: ${field} - ${firstMessage}`;
      }
    }
    return msg;
  }

  if (obj.errors && typeof obj.errors === "object") {
    const errorEntries = Object.entries(obj.errors);
    if (errorEntries.length > 0) {
      const [field, messages] = errorEntries[0];
      const firstMessage = Array.isArray(messages) ? messages[0] : messages;
      return `${field}: ${firstMessage}`;
    }
  }

  return "Backend request failed.";
}
