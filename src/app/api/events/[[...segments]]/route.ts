import { NextRequest } from "next/server";

import {
  failure,
  forwardedHeaders,
  getQueryParamValue,
  parseJsonBodyAs,
  parseMultipartBodyAs,
  parseOptionalInt,
  parseUuid,
  relay,
  withSegmentRoute,
} from "@/lib/bff/common";
import { nodeApi } from "@/lib/services/server-api";
import {
  type EventRegistrationCreateDto,
  EventRegistrationStatus,
  type EventAgendaCreateDto,
  type CreateEventBody,
  type GetEventRegistrationsParams,
  type GetEventsParams,
  type EventAgendaUpdateDto,
  type UpdateEventBody,
  type EventRegistrationUpdateDto,
  type RegisterForEventBody,
} from "@/lib/services/generated/node/schemas";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Context = {
  params: Promise<{ segments?: string[] }>;
};

type EventRoute =
  | { kind: "collection" }
  | { kind: "item"; eventId: string }
  | { kind: "agenda"; eventId: string }
  | { kind: "registrations"; eventId: string }
  | { kind: "agenda-item"; agendaId: string }
  | { kind: "register"; eventId: string }
  | { kind: "registration-status"; registrationId: string }
  | { kind: "not-found" };

function resolveEventRoute(segments: string[]): EventRoute {
  // Remove any trailing empty segment caused by a trailing slash
  if (segments.length && segments[segments.length - 1] === "") {
    segments = segments.slice(0, -1);
  }

  if (segments.length === 0) {
    return { kind: "collection" };
  }

  if (segments.length === 1) {
    return { kind: "item", eventId: segments[0] };
  }

  if (segments.length === 2 && segments[1] === "agenda") {
    return { kind: "agenda", eventId: segments[0] };
  }

  if (segments.length === 2 && segments[1] === "registrations") {
    return { kind: "registrations", eventId: segments[0] };
  }

  if (segments.length === 2 && segments[0] === "agenda") {
    return { kind: "agenda-item", agendaId: segments[1] };
  }

  if (segments.length === 2 && segments[1] === "register") {
    return { kind: "register", eventId: segments[0] };
  }

  if (segments.length === 3 && segments[0] === "registrations" && segments[2] === "status") {
    return { kind: "registration-status", registrationId: segments[1] };
  }

  return { kind: "not-found" };
}


export async function GET(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      const headers = forwardedHeaders(request);
      const route = resolveEventRoute(segments);

      switch (route.kind) {
        case "collection": {
          const page = parseOptionalInt(
            getQueryParamValue(request, "page", "Page"),
            "page",
            requestId,
          );
          if (page.error) {
            return page.error;
          }

          const limit = parseOptionalInt(
            getQueryParamValue(request, "limit", "Limit"),
            "limit",
            requestId,
          );
          if (limit.error) {
            return limit.error;
          }

          return relay(
            await nodeApi.getEvents(
              buildGetEventsParams(request, page.value, limit.value),
              {
                headers,
              },
            ),
            requestId,
          );
        }

        case "item": {
          const idError = parseUuid(route.eventId, "id", requestId);
          if (idError) {
            return idError;
          }

          return relay(
            await nodeApi.getEventById(route.eventId, { headers }),
            requestId,
          );
        }

        case "agenda": {
          const idError = parseUuid(route.eventId, "id", requestId);
          if (idError) {
            return idError;
          }

          return relay(
            await nodeApi.getEventAgenda(route.eventId, undefined, { headers }),
            requestId,
          );
        }

        case "registrations": {
          const idError = parseUuid(route.eventId, "id", requestId);
          if (idError) {
            return idError;
          }

          const page = parseOptionalInt(
            getQueryParamValue(request, "page", "Page"),
            "page",
            requestId,
          );
          if (page.error) {
            return page.error;
          }

          const limit = parseOptionalInt(
            getQueryParamValue(request, "limit", "Limit"),
            "limit",
            requestId,
          );
          if (limit.error) {
            return limit.error;
          }

          return relay(
            await nodeApi.getEventRegistrations(
              route.eventId,
              buildGetEventRegistrationsParams(
                request,
                page.value,
                limit.value,
              ),
              { headers },
            ),
            requestId,
          );
        }

        default:
          return failure(
            { code: "NOT_FOUND", message: "Route not found." },
            404,
            requestId,
          );
      }
    },
  );
}

export async function POST(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      const headers = forwardedHeaders(request);
      const route = resolveEventRoute(segments);

      switch (route.kind) {
        case "collection": {
          const parsed = await parseMultipartBodyAs<CreateEventBody>(request);
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
            await nodeApi.createEvent(parsed.value, { headers }),
            requestId,
          );
        }

        case "agenda": {
          const idError = parseUuid(route.eventId, "id", requestId);
          if (idError) {
            return idError;
          }

          const parsed = await parseJsonBodyAs<EventAgendaCreateDto>(request);
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
            await nodeApi.createEventAgenda(route.eventId, parsed.value, {
              headers,
            }),
            requestId,
          );
        }

        case "register": {
          const idError = parseUuid(route.eventId, "id", requestId);
          if (idError) {
            return idError;
          }

          // We use a raw relay here because the generated nodeApi.registerForEvent
          // incorrectly handles complex FormData (like the Members array).
          const backendUrl = `${process.env.BACKEND_API_BASE_URL}/api/v1/Events/${route.eventId}/register`;
          const headers = forwardedHeaders(request) as Headers;
          const contentType = request.headers.get("content-type");
          if (contentType) {
            headers.set("content-type", contentType);
          }

          const response = await fetch(backendUrl, {
            method: "POST",
            headers,
            body: request.body,
            // @ts-ignore - duplex is required for streaming request bodies in some environments
            duplex: "half",
          });

          const data = await response.json().catch(() => ({}));
          return relay({ data, status: response.status }, requestId);
        }

        default:
          return failure(
            { code: "NOT_FOUND", message: "Route not found." },
            404,
            requestId,
          );
      }
    },
  );
}

export async function PUT(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      const headers = forwardedHeaders(request);
      const route = resolveEventRoute(segments);

      switch (route.kind) {
        case "item": {
          const idError = parseUuid(route.eventId, "id", requestId);
          if (idError) {
            return idError;
          }

          const parsed = await parseMultipartBodyAs<UpdateEventBody>(request);
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
            await nodeApi.updateEvent(route.eventId, parsed.value, {
              headers,
            }),
            requestId,
          );
        }

        case "agenda-item": {
          const agendaIdError = parseUuid(
            route.agendaId,
            "agendaId",
            requestId,
          );
          if (agendaIdError) {
            return agendaIdError;
          }

          const parsed = await parseJsonBodyAs<EventAgendaUpdateDto>(request);
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
            await nodeApi.updateEventAgenda(route.agendaId, parsed.value, {
              headers,
            }),
            requestId,
          );
        }

        default:
          return failure(
            { code: "NOT_FOUND", message: "Route not found." },
            404,
            requestId,
          );
      }
    },
  );
}

export async function PATCH(request: NextRequest, context: Context) {
  return withSegmentRoute(
    request,
    context,
    async ({ request, requestId, segments }) => {
      const headers = forwardedHeaders(request);
      const route = resolveEventRoute(segments);

      if (route.kind === "registration-status") {
        const registrationIdError = parseUuid(
          route.registrationId,
          "registrationId",
          requestId,
        );
        if (registrationIdError) {
          return registrationIdError;
        }

        const parsed =
          await parseJsonBodyAs<EventRegistrationUpdateDto>(request);
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
          await nodeApi.updateEventRegistrationStatus(
            route.registrationId,
            parsed.value,
            {
              headers,
            },
          ),
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
      const headers = forwardedHeaders(request);
      const route = resolveEventRoute(segments);

      if (route.kind === "agenda-item") {
        const agendaIdError = parseUuid(route.agendaId, "agendaId", requestId);
        if (agendaIdError) {
          return agendaIdError;
        }

        return relay(
          await nodeApi.deleteEventAgenda(route.agendaId, {
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

function buildGetEventsParams(
  request: NextRequest,
  page?: number,
  limit?: number,
): GetEventsParams {
  return {
    page,
    pageSize: limit,
  };
}

function buildGetEventRegistrationsParams(
  request: NextRequest,
  page?: number,
  limit?: number,
): GetEventRegistrationsParams {
  return {
    page,
    pageSize: limit,
  };
}
