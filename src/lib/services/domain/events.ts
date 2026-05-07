import type { EventResponseDto } from "@/lib/services/generated/frontend/schemas";

import { bffApi } from "@/lib/services/bff-client";

export async function listEvents(): Promise<EventResponseDto[]> {
  const response = await bffApi.events.list();
  return response.data ?? [];
}
