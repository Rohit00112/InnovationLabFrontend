import { NextRequest } from "next/server";

import {
  failure,
  forwardedHeaders,
  getQueryParamValue,
  parseEnumValue,
  parseJsonBodyAs,
  parseMultipartBodyAs,
  parseOptionalInt,
  parseUuid,
  relay,
  withSegmentRoute,
} from "@/lib/bff/common";
import { nodeApi } from "@/lib/services/server-api";
import {
  type EventRegistrationDto,
  EventRegistrationStatus,
  EventSortBy,
  EventStatus,
  SortOrder,
  type CreateEventAgendaDto,
  type CreateEventBody,
  type GetEventRegistrationsParams,
  type GetEventsParams,
  type UpdateEventAgendaDto,
  type UpdateEventBody,
  type UpdateEventRegistrationDto,
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

  if (
    segments.length === 3 &&
    segments[0] === "registrations" &&
    segments[2] === "status"
  ) {
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
            await nodeApi.getEventAgenda(route.eventId, { headers }),
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

          const parsed = await parseJsonBodyAs<CreateEventAgendaDto>(request);
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

          const parsed = await parseJsonBodyAs<EventRegistrationDto>(request);
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
            await nodeApi.registerForEvent(route.eventId, parsed.value, {
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

          const parsed = await parseJsonBodyAs<UpdateEventAgendaDto>(request);
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
          await parseJsonBodyAs<UpdateEventRegistrationDto>(request);
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
  const search = getQueryParamValue(request, "search", "Search");

  return {
    Status: parseEnumValue(
      EventStatus,
      getQueryParamValue(request, "status", "Status") ?? null,
    ),
    ParentEventId:
      getQueryParamValue(request, "parentEventId", "ParentEventId") ??
      undefined,
    SeriesName:
      getQueryParamValue(request, "seriesName", "SeriesName") ??
      search ??
      undefined,
    Page: page,
    Limit: limit,
    SortBy: parseEnumValue(
      EventSortBy,
      getQueryParamValue(request, "sortBy", "SortBy") ?? null,
    ),
    SortOrder: parseEnumValue(
      SortOrder,
      getQueryParamValue(request, "sortOrder", "SortOrder") ?? null,
    ),
  };
}

function buildGetEventRegistrationsParams(
  request: NextRequest,
  page?: number,
  limit?: number,
): GetEventRegistrationsParams {
  return {
    Status: parseEnumValue(
      EventRegistrationStatus,
      getQueryParamValue(request, "status", "Status") ?? null,
    ),
    Page: page,
    Limit: limit,
  };
}
