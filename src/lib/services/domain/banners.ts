import type { BannerGetDTO } from "@/lib/services/generated/frontend/schemas";

import { bffApi } from "@/lib/services/bff-client";

export async function listBanners(): Promise<BannerGetDTO[]> {
  const response = await bffApi.banners.list();
  return response.data ?? [];
}