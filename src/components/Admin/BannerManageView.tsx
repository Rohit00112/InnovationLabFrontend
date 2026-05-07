"use client";

import ResourceManageList from "@/components/Admin/ResourceManageList";
import { listBanners } from "@/lib/services/domain/banners";
import type { BannerGetDTO } from "@/lib/services/generated/frontend/schemas";
import { t } from "@/lib/i18n/messages";
import { adminPageTitles } from "@/constants/ui/adminPages";

export default function BannerManageView() {
  return (
    <ResourceManageList<BannerGetDTO>
      loadItems={listBanners}
      emptyMessage={t("admin.shared.noItems" as const, {
        resource: adminPageTitles.banners.heading,
      })}
      loadingMessage={t("admin.shared.loadingItems" as const, {
        resource: adminPageTitles.banners.heading,
      })}
      errorMessage={t("admin.shared.loadError" as const, {
        resource: adminPageTitles.banners.heading,
      })}
      getKey={(banner, index) =>
        String(
          (banner as { Id?: string; id?: string }).Id ??
            (banner as { id?: string }).id ??
            index,
        )
      }
      renderItem={(banner) => JSON.stringify(banner, null, 2)}
    />
  );
}
