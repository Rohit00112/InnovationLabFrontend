import type { FaqResponseDto } from "@/lib/services/generated/frontend/schemas";

import { bffApi } from "@/lib/services/bff-client";

export async function listFaqs(): Promise<FaqResponseDto[]> {
  const response = await bffApi.faqs.list();
  return response.data?.data ?? [];
}

export async function getFaqById(id: string): Promise<FaqResponseDto | null> {
  const response = await bffApi.faqs.getById(id);
  return response.data ?? null;
}
