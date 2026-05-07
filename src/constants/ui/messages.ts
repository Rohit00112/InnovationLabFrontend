import { t } from "@/lib/i18n/messages";

export const addFormMessages = {
  success: t("admin.addForm.success"),
  fallbackError: t("admin.addForm.fallbackError"),
  localSubmitNotice: t("admin.addForm.localSubmitNotice"),
  submitting: t("admin.addForm.submitting"),
  submit: t("admin.addForm.submit"),
  uploadFile: t("admin.addForm.uploadFile"),
  dragAndDropHint: t("admin.addForm.dragAndDropHint"),
  fileTypesHint: t("admin.addForm.fileTypesHint"),
} as const;
