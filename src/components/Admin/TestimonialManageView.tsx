"use client";

import ResourceManageList from "@/components/Admin/ResourceManageList";
import { listTestimonials } from "@/lib/services/domain/testimonials";
import type { TestimonialResponseDto } from "@/lib/services/generated/frontend/schemas";
import { t } from "@/lib/i18n/messages";
import { adminPageTitles } from "@/constants/ui/adminPages";

export default function TestimonialManageView() {
  return (
    <ResourceManageList<TestimonialResponseDto>
      loadItems={listTestimonials}
      emptyMessage={t("admin.shared.noItems" as const, {
        resource: adminPageTitles.testimonials.heading,
      })}
      loadingMessage={t("admin.shared.loadingItems" as const, {
        resource: adminPageTitles.testimonials.heading,
      })}
      errorMessage={t("admin.shared.loadError" as const, {
        resource: adminPageTitles.testimonials.heading,
      })}
      getKey={(testimonial, index) =>
        String((testimonial as { id?: string }).id ?? index)
      }
      renderItem={(testimonial) => JSON.stringify(testimonial, null, 2)}
    />
  );
}
