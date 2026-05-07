import type {
  AboutResponseDto,
  CoreValueResponseDto,
  JourneyItemResponseDto,
} from "@/lib/services/generated/frontend/schemas";

import { bffApi } from "@/lib/services/bff-client";

export async function listMissionVision(): Promise<AboutResponseDto[]> {
  const response = await bffApi.about.getMissionVision();
  const data = response.data ?? null;
  return data ? [data] : [];
}

export async function listCoreValues(): Promise<CoreValueResponseDto[]> {
  const response = await bffApi.about.getCoreValues();
  return response.data ?? [];
}

export async function listJourney(): Promise<JourneyItemResponseDto[]> {
  const response = await bffApi.about.getJourney();
  return response.data ?? [];
}
