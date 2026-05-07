import { NextRequest } from "next/server";

import {
  forwardedHeaders,
  parseJsonBodyAs,
  parseUuid,
  relay,
  withSegmentRoute,
  failure,
} from "@/lib/bff/common";
import { nodeApi } from "@/lib/services/server-api";
import type {
  CreateCoreValueBody,
  CreateJourneyItemBody,
  MissionVisionUpdateDto,
  UpdateCoreValueBody,
  UpdateJourneyItemBody,
  UpdateParentOrgBody,
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
      if (segments.length === 0) {
        return relay(
          await nodeApi.getAbout({ headers: forwardedHeaders(request) }),
          requestId,
        );
      }

      if (segments.length === 1 && segments[0] === "mission-vision") {
        return relay(
          await nodeApi.getMissionVision({
            headers: forwardedHeaders(request),
          }),
          requestId,
        );
      }

      if (segments.length === 1 && segments[0] === "core-values") {
        return relay(
          await nodeApi.getCoreValues({ headers: forwardedHeaders(request) }),
          requestId,
        );
      }

      if (segments.length === 1 && segments[0] === "parent-org") {
        return relay(
          await nodeApi.getParentOrg({ headers: forwardedHeaders(request) }),
          requestId,
        );
      }

      if (segments.length === 1 && segments[0] === "journey") {
        return relay(
          await nodeApi.getJourney({ headers: forwardedHeaders(request) }),
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
      if (segments.length === 1 && segments[0] === "core-values") {
        const parsed = await parseJsonBodyAs<CreateCoreValueBody>(request);
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
          await nodeApi.createCoreValue(parsed.value, {
            headers: forwardedHeaders(request),
          }),
          requestId,
        );
      }

      if (segments.length === 1 && segments[0] === "journey") {
        const parsed = await parseJsonBodyAs<CreateJourneyItemBody>(request);
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
          await nodeApi.createJourneyItem(parsed.value, {
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

export async function PATCH(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      if (segments.length === 1 && segments[0] === "mission-vision") {
        const parsed = await parseJsonBodyAs<MissionVisionUpdateDto>(request);
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
          await nodeApi.updateMissionVision(parsed.value, {
            headers: forwardedHeaders(request),
          }),
          requestId,
        );
      }

      if (segments.length === 1 && segments[0] === "parent-org") {
        const parsed = await parseJsonBodyAs<UpdateParentOrgBody>(request);
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
          await nodeApi.updateParentOrg(parsed.value, {
            headers: forwardedHeaders(request),
          }),
          requestId,
        );
      }

      if (segments.length === 2 && segments[0] === "core-values") {
        const idError = parseUuid(segments[1], "id", requestId);
        if (idError) {
          return idError;
        }

        const parsed = await parseJsonBodyAs<UpdateCoreValueBody>(request);
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
          await nodeApi.updateCoreValue(segments[1], parsed.value, {
            headers: forwardedHeaders(request),
          }),
          requestId,
        );
      }

      if (segments.length === 2 && segments[0] === "journey") {
        const idError = parseUuid(segments[1], "id", requestId);
        if (idError) {
          return idError;
        }

        const parsed = await parseJsonBodyAs<UpdateJourneyItemBody>(request);
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
          await nodeApi.updateJourneyItem(segments[1], parsed.value, {
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
      if (segments.length === 2 && segments[0] === "core-values") {
        const idError = parseUuid(segments[1], "id", requestId);
        if (idError) {
          return idError;
        }

        return relay(
          await nodeApi.deleteCoreValue(segments[1], {
            headers: forwardedHeaders(request),
          }),
          requestId,
        );
      }

      if (segments.length === 2 && segments[0] === "journey") {
        const idError = parseUuid(segments[1], "id", requestId);
        if (idError) {
          return idError;
        }

        return relay(
          await nodeApi.deleteJourneyItem(segments[1], {
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
