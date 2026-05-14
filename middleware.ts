import { NextRequest, NextResponse } from "next/server";
import {
  TEMPORARILY_HIDE_ADMIN_AND_LOGIN_ROUTES,
  BLOCKED_ROUTE,
  isBlockedPath,
} from "@/constants/routeAccess";
import { getAccessTokenFromRequest } from "@/lib/auth/session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Check for manual blocked routes (temporary toggle)
  if (TEMPORARILY_HIDE_ADMIN_AND_LOGIN_ROUTES && isBlockedPath(pathname)) {
    return NextResponse.rewrite(new URL(BLOCKED_ROUTE, request.url));
  }

  const accessToken = getAccessTokenFromRequest(request);
  const isAuthenticated = !!accessToken;

  // 2. Protect Admin Routes
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("returnTo", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // 3. Redirect authenticated users away from Login page
  if (pathname === "/login") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/admin"],
};
