"use client";

import ResourceManageList from "@/components/Admin/ResourceManageList";
import { listMissionVision } from "@/lib/services/domain/about";
import type { AboutResponseDto } from "@/lib/services/generated/frontend/schemas";
import { t } from "@/lib/i18n/messages";
import { adminPageTitles } from "@/constants/ui/adminPages";

export default function AboutManageView() {
  return (
    <ResourceManageList<AboutResponseDto>
      loadItems={listMissionVision}
      emptyMessage={t("admin.shared.noItems" as const, {
        resource: adminPageTitles.about.heading,
      })}
      loadingMessage={t("admin.shared.loadingItems" as const, {
        resource: adminPageTitles.about.heading,
      })}
      errorMessage={t("admin.shared.loadError" as const, {
        resource: adminPageTitles.about.heading,
      })}
      getKey={(item, index) => String((item as { id?: string }).id ?? index)}
      renderItem={(item) => JSON.stringify(item, null, 2)}
    />
  );
}
