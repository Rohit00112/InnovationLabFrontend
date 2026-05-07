import { NextRequest } from "next/server";

import {
  forwardedHeaders,
  parseEnumValue,
  parseJsonBodyAs,
  parseMultipartBodyAs,
  parseUuid,
  relay,
  failure,
  withSegmentRoute,
} from "@/lib/bff/common";
import { nodeApi } from "@/lib/services/server-api";
import {
  MediaType,
  type CreateBannerBody,
  type BannerScheduleUpdateDto,
  type GetBannersParams,
  type UpdateBannerBody,
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
        return relay(
          await nodeApi.getBanners(buildGetAllBannersParams(request), {
            headers,
          }),
          requestId,
        );
      }

      if (segments.length === 1) {
        const idError = parseUuid(segments[0], "id", requestId);
        if (idError) {
          return idError;
        }

        return relay(
          await nodeApi.getBannerById(segments[0], { headers }),
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
      const headers = forwardedHeaders(request);

      if (segments.length === 0) {
        const parsed = await parseMultipartBodyAs<CreateBannerBody>(request);
        if (parsed.error) {
          return parsed.error;
        }

        if (!parsed.value) {
          return failure(
            {
              code: "INVALID_BODY",
              message: "Request body must be a multipart form object.",
            },
            400,
            requestId,
          );
        }

        return relay(
          await nodeApi.createBanner(parsed.value, { headers }),
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

export async function PATCH(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      const headers = forwardedHeaders(request);

      if (segments.length === 1) {
        const idError = parseUuid(segments[0], "id", requestId);
        if (idError) {
          return idError;
        }

        const parsed = await parseMultipartBodyAs<UpdateBannerBody>(request);
        if (parsed.error) {
          return parsed.error;
        }

        if (!parsed.value) {
          return failure(
            {
              code: "INVALID_BODY",
              message: "Request body must be a multipart form object.",
            },
            400,
            requestId,
          );
        }

        return relay(
          await nodeApi.updateBanner(segments[0], parsed.value, {
            headers,
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
      const headers = forwardedHeaders(request);

      if (segments.length === 2 && segments[1] === "activate") {
        const idError = parseUuid(segments[0], "id", requestId);
        if (idError) {
          return idError;
        }

        return relay(
          await nodeApi.activateBanner(segments[0], { headers }),
          requestId,
        );
      }

      if (segments.length === 2 && segments[1] === "schedule") {
        const idError = parseUuid(segments[0], "id", requestId);
        if (idError) {
          return idError;
        }

        const parsed = await parseJsonBodyAs<BannerScheduleUpdateDto>(request);
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
          await nodeApi.scheduleBanner(segments[0], parsed.value, {
            headers,
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

function buildGetAllBannersParams(request: NextRequest): GetBannersParams {
  return {
    type: parseEnumValue(MediaType, request.nextUrl.searchParams.get("type")),
    scheduledStart:
      request.nextUrl.searchParams.get("scheduledStart") ?? undefined,
    scheduledEnd: request.nextUrl.searchParams.get("scheduledEnd") ?? undefined,
    createdAfter: request.nextUrl.searchParams.get("createdAfter") ?? undefined,
  };
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
          await nodeApi.deleteBanner(segments[0], {
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
