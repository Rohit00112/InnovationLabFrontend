export const TEMPORARILY_HIDE_ADMIN_AND_LOGIN_ROUTES = true;

export const BLOCKED_ROUTE = "/__blocked";

export function isBlockedPath(pathname: string): boolean {
  const blockedPaths = ["/admin", "/login"];
  return blockedPaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );
}