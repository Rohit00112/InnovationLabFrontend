"use client";

import ResourceManageList from "@/components/Admin/ResourceManageList";
import { listCoreValues } from "@/lib/services/domain/about";
import type { CoreValueResponseDto } from "@/lib/services/generated/frontend/schemas";
import { t } from "@/lib/i18n/messages";
import { adminPageTitles } from "@/constants/ui/adminPages";

export default function CoreValuesManageView() {
  return (
    <ResourceManageList<CoreValueResponseDto>
      loadItems={listCoreValues}
      emptyMessage={t("admin.shared.noItems" as const, {
        resource: adminPageTitles.coreValues.heading,
      })}
      loadingMessage={t("admin.shared.loadingItems" as const, {
        resource: adminPageTitles.coreValues.heading,
      })}
      errorMessage={t("admin.shared.loadError" as const, {
        resource: adminPageTitles.coreValues.heading,
      })}
      getKey={(item, index) => String((item as { id?: string }).id ?? index)}
      renderItem={(item) => JSON.stringify(item, null, 2)}
    />
  );
}
