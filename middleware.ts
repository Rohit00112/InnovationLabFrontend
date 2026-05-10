import { NextRequest, NextResponse } from "next/server";

import {
  extractAuthTokens,
  getAccessTokenFromRequest,
  getRefreshTokenFromRequest,
  requestAuthBackend,
  setAuthCookies,
  clearAuthCookies,
} from "@/lib/auth/session";

const TEMPORARILY_HIDE_ADMIN_AND_LOGIN = true;
const BLOCKED_ROUTE = "/__blocked";

function isBlockedPath(pathname: string): boolean {
  return (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/login" ||
    pathname.startsWith("/login/")
  );
}

export async function middleware(request: NextRequest) {
  if (
    !TEMPORARILY_HIDE_ADMIN_AND_LOGIN ||
    !isBlockedPath(request.nextUrl.pathname)
  ) {
    return NextResponse.next();
  }

  return NextResponse.rewrite(new URL(BLOCKED_ROUTE, request.url));
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/login", "/login/:path*"],
};
