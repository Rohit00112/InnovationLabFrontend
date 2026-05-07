"use client";

import ResourceManageList from "@/components/Admin/ResourceManageList";
import { listEvents } from "@/lib/services/domain/events";
import type { EventResponseDto } from "@/lib/services/generated/frontend/schemas";
import { t } from "@/lib/i18n/messages";
import { adminPageTitles } from "@/constants/ui/adminPages";

export default function EventManageView() {
  return (
    <ResourceManageList<EventResponseDto>
      loadItems={listEvents}
      emptyMessage={t("admin.shared.noItems" as const, {
        resource: adminPageTitles.events.heading,
      })}
      loadingMessage={t("admin.shared.loadingItems" as const, {
        resource: adminPageTitles.events.heading,
      })}
      errorMessage={t("admin.shared.loadError" as const, {
        resource: adminPageTitles.events.heading,
      })}
      getKey={(event, index) => String((event as { id?: string }).id ?? index)}
      renderItem={(event) => JSON.stringify(event, null, 2)}
    />
  );
}
