import type {
  AboutResponseDto,
  BannerResponseDto,
  CategoryResponseDto,
  ContactResponseDto,
  CoreValueResponseDto,
  EventAgendaResponseDto,
  EventRegistrationCreateDto,
  EventRegistrationResponseDto,
  EventResponseDto,
  FaqResponseDto,
  GetFaqsParams,
  JourneyItemResponseDto,
  MediaType,
  FaqListResponseDto,
  ContactCreateDto,
  TestimonialResponseDto,
  EventRegistrationUpdateDto,
} from "@/lib/services/generated/frontend/schemas";

export type BffMeta = {
  requestId: string;
  timestamp: string;
};

export type BffError = {
  code: string;
  message: string;
  details?: unknown;
};

export type BffEnvelope<T> = {
  success: boolean;
  data: T | null;
  error: BffError | null;
  meta: BffMeta;
};

export type ApiRequestOptions<TBody = unknown> = {
  query?: Record<string, string | number | boolean | undefined>;
  body?: TBody;
  headers?: HeadersInit;
  signal?: AbortSignal;
};

export type LoginRequestDto = {
  email?: string | null;
  password?: string | null;
};

export type TokenRequestDto = {
  refreshToken?: string | null;
};

export type AuthSessionResponse = {
  authenticated: boolean;
};

export class LocalApiError extends Error {
  status: number;
  envelope?: BffEnvelope<unknown>;

  constructor(
    message: string,
    status: number,
    envelope?: BffEnvelope<unknown>,
  ) {
    super(message);
    this.name = "LocalApiError";
    this.status = status;
    this.envelope = envelope;
  }
}

async function localApiRequest<TResponse, TBody = unknown>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  path: string,
  options: ApiRequestOptions<TBody> = {},
): Promise<BffEnvelope<TResponse>> {
  const url = new URL(path, getBaseUrl());
  if (options.query) {
    for (const [key, value] of Object.entries(options.query)) {
      if (value === undefined) {
        continue;
      }
      url.searchParams.set(key, String(value));
    }
  }

  const headers = new Headers(options.headers);
  const requestInit: RequestInit = {
    method,
    headers,
    signal: options.signal,
  };

  if (options.body !== undefined) {
    if (options.body instanceof FormData) {
      requestInit.body = options.body;
    } else {
      headers.set("content-type", "application/json");
      requestInit.body = JSON.stringify(options.body);
    }
  }

  const response = await fetch(url, requestInit);
  const payload = (await response.json()) as unknown;

  if (!isBffEnvelope(payload)) {
    throw new LocalApiError(
      "Invalid API envelope returned by local BFF route.",
      response.status,
    );
  }

  const envelope = payload as BffEnvelope<TResponse>;
  if (!response.ok || !envelope.success) {
    throw new LocalApiError(
      envelope.error?.message ?? "Request to local BFF route failed.",
      response.status,
      envelope,
    );
  }

  return envelope;
}

function isBffEnvelope(value: unknown): value is BffEnvelope<unknown> {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as {
    success?: unknown;
    data?: unknown;
    error?: unknown;
    meta?: unknown;
  };

  return (
    typeof candidate.success === "boolean" &&
    "data" in candidate &&
    "error" in candidate &&
    !!candidate.meta &&
    typeof candidate.meta === "object"
  );
}

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }

  return "http://localhost:3000";
}

export const localApi = {
  get: <TResponse>(path: string, options?: ApiRequestOptions) =>
    localApiRequest<TResponse>("GET", path, options),
  post: <TResponse, TBody = unknown>(
    path: string,
    options?: ApiRequestOptions<TBody>,
  ) => localApiRequest<TResponse, TBody>("POST", path, options),
  put: <TResponse, TBody = unknown>(
    path: string,
    options?: ApiRequestOptions<TBody>,
  ) => localApiRequest<TResponse, TBody>("PUT", path, options),
  patch: <TResponse, TBody = unknown>(
    path: string,
    options?: ApiRequestOptions<TBody>,
  ) => localApiRequest<TResponse, TBody>("PATCH", path, options),
  delete: <TResponse>(path: string, options?: ApiRequestOptions) =>
    localApiRequest<TResponse>("DELETE", path, options),
};

type AboutData =
  | AboutResponseDto
  | CoreValueResponseDto[]
  | JourneyItemResponseDto[]
  | null;

export const bffApi = {
  auth: {
    login: (body: LoginRequestDto) =>
      localApi.post<AuthSessionResponse, LoginRequestDto>("/api/auth/login", {
        body,
      }),
    refreshToken: (body: TokenRequestDto) =>
      localApi.post<AuthSessionResponse, TokenRequestDto>(
        "/api/auth/refresh-token",
        {
          body,
        },
      ),
    logout: () => localApi.post<AuthSessionResponse>("/api/auth/logout"),
  },
  about: {
    get: () => localApi.get<AboutData>("/api/about"),
    getMissionVision: () =>
      localApi.get<AboutResponseDto>("/api/about/mission-vision"),
    getCoreValues: () =>
      localApi.get<CoreValueResponseDto[]>("/api/about/core-values"),
    getParentOrg: () => localApi.get<AboutResponseDto>("/api/about/parent-org"),
    getJourney: () =>
      localApi.get<JourneyItemResponseDto[]>("/api/about/journey"),
  },
  banners: {
    list: (params?: {
      type?: MediaType;
      startDate?: string;
      endDate?: string;
      createdAfter?: string;
    }) => localApi.get<BannerResponseDto[]>("/api/banners", { query: params }),
    getById: (id: string) =>
      localApi.get<BannerResponseDto>(`/api/banners/${id}`),
    create: (formData: FormData) =>
      localApi.post<BannerResponseDto, FormData>("/api/banners", {
        body: formData,
      }),
    update: (id: string, formData: FormData) =>
      localApi.patch<BannerResponseDto, FormData>(`/api/banners/${id}`, {
        body: formData,
      }),
    activate: (id: string) => localApi.put<void>(`/api/banners/${id}/activate`),
    schedule: (id: string, body: { StartDate: string; EndDate: string }) =>
      localApi.put<void, { StartDate: string; EndDate: string }>(
        `/api/banners/${id}/schedule`,
        { body },
      ),
    remove: (id: string) => localApi.delete<void>(`/api/banners/${id}`),
  },
  categories: {
    list: () => localApi.get<CategoryResponseDto[]>("/api/categories"),
    getById: (id: string) =>
      localApi.get<CategoryResponseDto>(`/api/categories/${id}`),
  },
  contacts: {
    list: (params?: { page?: number; limit?: number }) =>
      localApi.get<ContactResponseDto[]>("/api/contacts", { query: params }),
    create: (body: ContactCreateDto) =>
      localApi.post<ContactResponseDto, ContactCreateDto>("/api/contacts", {
        body,
      }),
  },
  events: {
    list: (params?: Record<string, string | number | boolean | undefined>) =>
      localApi.get<EventResponseDto[]>("/api/events", { query: params }),
    getById: (id: string) =>
      localApi.get<EventResponseDto>(`/api/events/${id}`),
    getAgenda: (id: string) =>
      localApi.get<EventAgendaResponseDto[]>(`/api/events/${id}/agenda`),
    create: (formData: FormData) =>
      localApi.post<EventResponseDto, FormData>("/api/events", {
        body: formData,
      }),
    register: (id: string, body: FormData) =>
      localApi.post<EventRegistrationResponseDto, FormData>(
        `/api/events/${id}/register`,
        { body },
      ),
    updateRegistrationStatus: (
      registrationId: string,
      body: EventRegistrationUpdateDto,
    ) =>
      localApi.patch<void, EventRegistrationUpdateDto>(
        `/api/events/registrations/${registrationId}/status`,
        { body },
      ),
  },
  faqs: {
    list: (params?: GetFaqsParams) =>
      localApi.get<FaqListResponseDto>("/api/faqs", { query: params }),
    getById: (id: string) => localApi.get<FaqResponseDto>(`/api/faqs/${id}`),
  },
  testimonials: {
    list: () => localApi.get<TestimonialResponseDto[]>("/api/testimonials"),
    getById: (id: string) =>
      localApi.get<TestimonialResponseDto>(`/api/testimonials/${id}`),
    create: (formData: FormData) =>
      localApi.post<TestimonialResponseDto, FormData>("/api/testimonials", {
        body: formData,
      }),
    upload: (formData: FormData) =>
      localApi.post<{ Path: string }, FormData>("/api/testimonials/upload", {
        body: formData,
      }),
  },
};
