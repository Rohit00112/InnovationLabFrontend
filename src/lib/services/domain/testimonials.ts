import type { TestimonialResponseDto } from "@/lib/services/generated/frontend/schemas";

import { bffApi } from "@/lib/services/bff-client";

export async function listTestimonials(): Promise<TestimonialResponseDto[]> {
  const response = await bffApi.testimonials.list();
  return response.data ?? [];
}