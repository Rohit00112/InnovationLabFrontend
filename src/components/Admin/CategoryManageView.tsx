"use client";

import ResourceManageList from "@/components/Admin/ResourceManageList";
import { listCategories } from "@/lib/services/domain/categories";
import type { CategoryResponseDto } from "@/lib/services/generated/frontend/schemas";
import { t } from "@/lib/i18n/messages";
import { adminPageTitles } from "@/constants/ui/adminPages";

export default function CategoryManageView() {
  return (
    <ResourceManageList<CategoryResponseDto>
      loadItems={listCategories}
      emptyMessage={t("admin.shared.noItems" as const, {
        resource: adminPageTitles.categories.heading,
      })}
      loadingMessage={t("admin.shared.loadingItems" as const, {
        resource: adminPageTitles.categories.heading,
      })}
      errorMessage={t("admin.shared.loadError" as const, {
        resource: adminPageTitles.categories.heading,
      })}
      getKey={(category, index) =>
        String((category as { id?: string }).id ?? index)
      }
      renderItem={(category) => JSON.stringify(category, null, 2)}
    />
  );
}
