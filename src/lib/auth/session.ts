import { NextRequest, NextResponse } from "next/server";

export const AUTH_ACCESS_TOKEN_COOKIE = "innovationlab.auth.access-token";
export const AUTH_REFRESH_TOKEN_COOKIE = "innovationlab.auth.refresh-token";

export type AuthTokenPair = {
  accessToken: string;
  refreshToken: string;
};

export type AuthBackendResult = {
  data: unknown;
  status: number;
};

const isProduction = process.env.NODE_ENV === "production";

export function getAccessTokenFromRequest(request: NextRequest): string | null {
  return normalizeToken(request.cookies.get(AUTH_ACCESS_TOKEN_COOKIE)?.value);
}

export function getRefreshTokenFromRequest(
  request: NextRequest,
): string | null {
  return normalizeToken(request.cookies.get(AUTH_REFRESH_TOKEN_COOKIE)?.value);
}

export function hasAuthCookie(request: NextRequest): boolean {
  return Boolean(
    getAccessTokenFromRequest(request) || getRefreshTokenFromRequest(request),
  );
}

export function extractAuthTokens(
  payload: unknown,
  refreshTokenFallback?: string | null,
): AuthTokenPair | null {
  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return null;
  }

  const accessToken = findTokenValue(payload, [
    "accessToken",
    "access_token",
    "token",
    "jwt",
    "jwtToken",
    "bearerToken",
  ]);

  const refreshToken =
    findTokenValue(payload, ["refreshToken", "refresh_token"]) ??
    normalizeToken(refreshTokenFallback);

  if (!accessToken || !refreshToken) {
    return null;
  }

  return {
    accessToken,
    refreshToken,
  };
}

export function setAuthCookies(
  response: NextResponse,
  tokens: AuthTokenPair,
): void {
  response.cookies.set(AUTH_ACCESS_TOKEN_COOKIE, tokens.accessToken, {
    ...baseCookieOptions(),
    ...buildExpiryOptions(tokens.accessToken),
  });

  response.cookies.set(AUTH_REFRESH_TOKEN_COOKIE, tokens.refreshToken, {
    ...baseCookieOptions(),
    ...buildExpiryOptions(tokens.refreshToken),
  });
}

export function clearAuthCookies(response: NextResponse): void {
  response.cookies.set(AUTH_ACCESS_TOKEN_COOKIE, "", {
    ...baseCookieOptions(),
    maxAge: 0,
  });
  response.cookies.set(AUTH_REFRESH_TOKEN_COOKIE, "", {
    ...baseCookieOptions(),
    maxAge: 0,
  });
}

export async function requestAuthBackend(
  baseUrl: string,
  path: string,
  body: unknown,
  headers?: HeadersInit,
): Promise<AuthBackendResult> {
  if (!baseUrl) {
    return {
      status: 500,
      data: {
        message:
          "AUTH_BACKEND_API_BASE_URL or BACKEND_API_BASE_URL is missing.",
      },
    };
  }

  const requestHeaders = new Headers(headers);
  requestHeaders.set("content-type", "application/json");

  const response = await fetch(`${baseUrl}${path}`, {
    method: "POST",
    headers: requestHeaders,
    body: JSON.stringify(body),
    cache: "no-store",
  });

  return {
    status: response.status,
    data: await parseResponseBody(response),
  };
}

function baseCookieOptions() {
  return {
    httpOnly: true,
    secure: isProduction,
    sameSite: "lax" as const,
    path: "/",
  };
}

function buildExpiryOptions(token: string): { expires?: Date } {
  const expires = readJwtExpiration(token);
  return expires ? { expires } : {};
}

function normalizeToken(value: string | null | undefined): string | null {
  if (!value) {
    return null;
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return null;
  }

  return trimmed.replace(/^Bearer\s+/i, "").trim() || null;
}

function findTokenValue(
  value: unknown,
  candidateKeys: string[],
): string | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  const record = value as Record<string, unknown>;
  for (const [key, candidateValue] of Object.entries(record)) {
    if (
      candidateKeys.some(
        (candidateKey) => candidateKey.toLowerCase() === key.toLowerCase(),
      ) &&
      typeof candidateValue === "string"
    ) {
      const normalized = normalizeToken(candidateValue);
      if (normalized) {
        return normalized;
      }
    }
  }

  for (const candidateValue of Object.values(record)) {
    const nested = findTokenValue(candidateValue, candidateKeys);
    if (nested) {
      return nested;
    }
  }

  return null;
}

function readJwtExpiration(token: string): Date | undefined {
  const parts = token.split(".");
  if (parts.length < 2) {
    return undefined;
  }

  try {
    const payload = JSON.parse(decodeBase64Url(parts[1])) as { exp?: unknown };

    if (typeof payload.exp !== "number") {
      return undefined;
    }

    return new Date(payload.exp * 1000);
  } catch {
    return undefined;
  }
}

function decodeBase64Url(value: string): string {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(
    normalized.length + ((4 - (normalized.length % 4)) % 4),
    "=",
  );

  return atob(padded);
}

async function parseResponseBody(response: Response): Promise<unknown> {
  const text = await response.text();
  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { message: text };
  }
}
