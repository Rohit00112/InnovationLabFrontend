import { NextRequest } from "next/server";

import {
  failure,
  withSegmentRoute,
  parseJsonBodyAs,
  success,
  relay,
} from "@/lib/bff/common";
import {
  clearAuthCookies,
  extractAuthTokens,
  getRefreshTokenFromRequest,
  requestAuthBackend,
  setAuthCookies,
} from "@/lib/auth/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ segments?: string[] }>;
};

type LoginRequestDto = {
  email?: string | null;
  password?: string | null;
};

type TokenRequestDto = {
  refreshToken?: string | null;
};

export async function POST(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      if (segments.length !== 1) {
        return failure(
          { code: "NOT_FOUND", message: "Route not found." },
          404,
          requestId,
        );
      }

      if (segments[0] === "login") {
        const parsed = await parseJsonBodyAs<LoginRequestDto>(request);
        if (parsed.error) {
          return parsed.error;
        }

        if (!parsed.value) {
          return failure(
            {
              code: "INVALID_BODY",
              message: "Request body must be a JSON object.",
            },
            400,
            requestId,
          );
        }

        if (!parsed.value.email || !parsed.value.password) {
          return failure(
            {
              code: "INVALID_BODY",
              message: "email and password are required.",
            },
            400,
            requestId,
          );
        }

        const result = await requestAuthBackend(
          getAuthBackendBaseUrl(),
          "/api/v1/Users/login",
          parsed.value,
        );

        if (result.status < 200 || result.status >= 300) {
          return relay(result, requestId);
        }

        const tokens = extractAuthTokens(result.data);
        if (!tokens) {
          return failure(
            {
              code: "AUTH_ERROR",
              message: "Login succeeded but auth tokens were not returned.",
              details: result.data,
            },
            502,
            requestId,
          );
        }

        const response = success(
          { authenticated: true },
          result.status,
          requestId,
        );
        setAuthCookies(response, tokens);
        return response;
      }

      if (segments[0] === "refresh-token") {
        let refreshToken = getRefreshTokenFromRequest(request);
        const parsed = await parseJsonBodyAs<TokenRequestDto>(request);
        refreshToken = parsed.value?.refreshToken ?? refreshToken;

        if (!refreshToken) {
          return failure(
            {
              code: "INVALID_BODY",
              message: "refreshToken is required.",
            },
            400,
            requestId,
          );
        }

        const result = await requestAuthBackend(
          getAuthBackendBaseUrl(),
          "/api/v1/Users/refresh-token",
          { refreshToken },
        );

        if (result.status < 200 || result.status >= 300) {
          return relay(result, requestId);
        }

        const tokens = extractAuthTokens(result.data, refreshToken);
        if (!tokens) {
          return failure(
            {
              code: "AUTH_ERROR",
              message:
                "Token refresh succeeded but auth tokens were not returned.",
              details: result.data,
            },
            502,
            requestId,
          );
        }

        const response = success(
          { authenticated: true },
          result.status,
          requestId,
        );
        setAuthCookies(response, tokens);
        return response;
      }

      if (segments[0] === "logout") {
        const response = success({ authenticated: false }, 200, requestId);
        clearAuthCookies(response);
        return response;
      }

      return failure(
        { code: "NOT_FOUND", message: "Route not found." },
        404,
        requestId,
      );
    },
  );
}

function getAuthBackendBaseUrl(): string {
  return (
    process.env.AUTH_BACKEND_API_BASE_URL ??
    process.env.BACKEND_API_BASE_URL ??
    ""
  );
}
