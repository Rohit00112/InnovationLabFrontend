import type { Tab } from "@/components/Admin/AdminViewSwitcher";
import { t } from "@/lib/i18n/messages";

export const ADMIN_VIEW_TABS: Tab[] = [
  { id: "manage", label: t("admin.tabs.manage") },
  { id: "add", label: t("admin.tabs.add") },
  { id: "preview", label: t("admin.tabs.preview") },
];
