import type { CategoryResponseDto } from "@/lib/services/generated/frontend/schemas";

import { bffApi } from "@/lib/services/bff-client";

export async function listCategories(): Promise<CategoryResponseDto[]> {
  const response = await bffApi.categories.list();
  return response.data ?? [];
}

export async function getCategoryById(
  id: string,
): Promise<CategoryResponseDto | null> {
  const response = await bffApi.categories.getById(id);
  return response.data;
}
