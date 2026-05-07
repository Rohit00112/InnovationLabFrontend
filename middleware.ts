import { NextRequest, NextResponse } from "next/server";

import {
  extractAuthTokens,
  getAccessTokenFromRequest,
  getRefreshTokenFromRequest,
  requestAuthBackend,
  setAuthCookies,
  clearAuthCookies,
} from "@/lib/auth/session";

const ADMIN_PATH_PREFIX = "/admin";

export async function middleware(request: NextRequest) {
  if (!request.nextUrl.pathname.startsWith(ADMIN_PATH_PREFIX)) {
    return NextResponse.next();
  }

  const refreshToken = getRefreshTokenFromRequest(request);
  if (!refreshToken) {
    return redirectToLogin(request);
  }

  const accessToken = getAccessTokenFromRequest(request);
  if (accessToken) {
    return NextResponse.next();
  }

  const baseUrl = getAuthBackendBaseUrl();
  if (!baseUrl) {
    return redirectToLogin(request);
  }

  const result = await requestAuthBackend(
    baseUrl,
    "/api/v1/Users/refresh-token",
    {
      refreshToken,
    },
  );

  if (result.status < 200 || result.status >= 300) {
    return redirectToLogin(request);
  }

  const tokens = extractAuthTokens(result.data, refreshToken);
  if (!tokens) {
    return redirectToLogin(request);
  }

  const response = NextResponse.redirect(request.nextUrl.clone());
  setAuthCookies(response, tokens);
  return response;
}

function redirectToLogin(request: NextRequest): NextResponse {
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set(
    "returnTo",
    request.nextUrl.pathname + request.nextUrl.search,
  );

  const response = NextResponse.redirect(loginUrl);
  clearAuthCookies(response);
  return response;
}

function getAuthBackendBaseUrl(): string {
  return (
    process.env.AUTH_BACKEND_API_BASE_URL ??
    process.env.BACKEND_API_BASE_URL ??
    ""
  );
}

export const config = {
  matcher: ["/admin/:path*"],
};
