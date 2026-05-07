"use client";

import ResourceManageList from "@/components/Admin/ResourceManageList";
import { listJourney } from "@/lib/services/domain/about";
import type { JourneyItemResponseDto } from "@/lib/services/generated/frontend/schemas";
import { t } from "@/lib/i18n/messages";
import { adminPageTitles } from "@/constants/ui/adminPages";

export default function JourneyManageView() {
  return (
    <ResourceManageList<JourneyItemResponseDto>
      loadItems={listJourney}
      emptyMessage={t("admin.shared.noItems" as const, {
        resource: adminPageTitles.journey.heading,
      })}
      loadingMessage={t("admin.shared.loadingItems" as const, {
        resource: adminPageTitles.journey.heading,
      })}
      errorMessage={t("admin.shared.loadError" as const, {
        resource: adminPageTitles.journey.heading,
      })}
      getKey={(item, index) => String((item as { id?: string }).id ?? index)}
      renderItem={(item) => JSON.stringify(item, null, 2)}
    />
  );
}
