import type { ContactResponseDto } from "@/lib/services/generated/frontend/schemas";

import { bffApi } from "@/lib/services/bff-client";

export async function listContacts(): Promise<ContactResponseDto[]> {
  const response = await bffApi.contacts.list();
  return response.data ?? [];
}
