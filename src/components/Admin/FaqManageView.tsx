"use client";

import ResourceManageList from "@/components/Admin/ResourceManageList";
import { listFaqs } from "@/lib/services/domain/faqs";
import type { FaqResponseDto } from "@/lib/services/generated/frontend/schemas";
import { t } from "@/lib/i18n/messages";
import { adminPageTitles } from "@/constants/ui/adminPages";

export default function FaqManageView() {
  return (
    <ResourceManageList<FaqResponseDto>
      loadItems={listFaqs}
      emptyMessage={t("admin.shared.noItems" as const, {
        resource: adminPageTitles.faq.heading,
      })}
      loadingMessage={t("admin.shared.loadingItems" as const, {
        resource: adminPageTitles.faq.heading,
      })}
      errorMessage={t("admin.shared.loadError" as const, {
        resource: adminPageTitles.faq.heading,
      })}
      getKey={(item, index) => String((item as { id?: string }).id ?? index)}
      renderItem={(item) => JSON.stringify(item, null, 2)}
    />
  );
}
