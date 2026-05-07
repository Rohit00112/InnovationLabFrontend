"use client";

import ResourceManageList from "@/components/Admin/ResourceManageList";
import { listContacts } from "@/lib/services/domain/contacts";
import type { ContactResponseDto } from "@/lib/services/generated/frontend/schemas";
import { t } from "@/lib/i18n/messages";
import { adminPageTitles } from "@/constants/ui/adminPages";

export default function ContactManageView() {
  return (
    <ResourceManageList<ContactResponseDto>
      loadItems={listContacts}
      emptyMessage={t("admin.shared.noItems" as const, {
        resource: adminPageTitles.contacts.heading,
      })}
      loadingMessage={t("admin.shared.loadingItems" as const, {
        resource: adminPageTitles.contacts.heading,
      })}
      errorMessage={t("admin.shared.loadError" as const, {
        resource: adminPageTitles.contacts.heading,
      })}
      getKey={(item, index) => String((item as { id?: string }).id ?? index)}
      renderItem={(item) => JSON.stringify(item, null, 2)}
    />
  );
}
