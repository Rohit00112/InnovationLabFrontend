import type {
  EventResponseDto,
  EventAgendaResponseDto,
} from "@/lib/services/generated/frontend/schemas";

import { bffApi } from "@/lib/services/bff-client";

export async function listEvents(): Promise<EventResponseDto[]> {
  const response = await bffApi.events.list();
  return response.data ?? [];
}

export async function getEventById(
  id: string,
): Promise<EventResponseDto | null> {
  const response = await bffApi.events.getById(id);
  return response.data;
}

export async function getEventAgenda(
  id: string,
): Promise<EventAgendaResponseDto[]> {
  const response = await bffApi.events.getAgenda(id);
  return response.data ?? [];
}
