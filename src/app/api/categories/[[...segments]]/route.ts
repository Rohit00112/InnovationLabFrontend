import { NextRequest } from "next/server";

import {
  forwardedHeaders,
  parseJsonBodyAs,
  parseUuid,
  relay,
  failure,
  withSegmentRoute,
} from "@/lib/bff/common";
import { nodeApi } from "@/lib/services/server-api";
import type {
  CreateCategoryDto,
  UpdateCategoryDto,
} from "@/lib/services/generated/node/schemas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ segments?: string[] }>;
};

export async function GET(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      const headers = forwardedHeaders(request);

      if (segments.length === 0) {
        return relay(await nodeApi.getAllCategories({ headers }), requestId);
      }

      if (segments.length === 1) {
        const idError = parseUuid(segments[0], "id", requestId);
        if (idError) {
          return idError;
        }

        return relay(
          await nodeApi.getCategoryById(segments[0], { headers }),
          requestId,
        );
      }

      return failure(
        { code: "NOT_FOUND", message: "Route not found." },
        404,
        requestId,
      );
    },
  );
}

export async function POST(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      if (segments.length === 0) {
        const parsed = await parseJsonBodyAs<CreateCategoryDto>(request);
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

        return relay(
          await nodeApi.createCategory(parsed.value, {
            headers: forwardedHeaders(request),
          }),
          requestId,
        );
      }

      return failure(
        { code: "NOT_FOUND", message: "Route not found." },
        404,
        requestId,
      );
    },
  );
}

export async function PUT(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      if (segments.length === 1) {
        const idError = parseUuid(segments[0], "id", requestId);
        if (idError) {
          return idError;
        }

        const parsed = await parseJsonBodyAs<UpdateCategoryDto>(request);
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

        return relay(
          await nodeApi.updateCategory(segments[0], parsed.value, {
            headers: forwardedHeaders(request),
          }),
          requestId,
        );
      }

      return failure(
        { code: "NOT_FOUND", message: "Route not found." },
        404,
        requestId,
      );
    },
  );
}

export async function DELETE(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      if (segments.length === 1) {
        const idError = parseUuid(segments[0], "id", requestId);
        if (idError) {
          return idError;
        }

        return relay(
          await nodeApi.deleteCategoryById(segments[0], {
            headers: forwardedHeaders(request),
          }),
          requestId,
        );
      }

      return failure(
        { code: "NOT_FOUND", message: "Route not found." },
        404,
        requestId,
      );
    },
  );
}
