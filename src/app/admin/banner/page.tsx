import AddForms, { FormField } from "@/components/Admin/AddForms";
import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import BannerManageView from "@/components/Admin/BannerManageView";
import EditShell from "@/components/Admin/EditShell";
import { ADMIN_VIEW_TABS } from "@/constants/ui/admin";
import { adminPageTitles } from "@/constants/ui/adminPages";
import { adminPlaceholders } from "@/constants/ui/placeholders";
import { t } from "@/lib/i18n/messages";

const formFields: FormField[] = [
  {
    name: "Image",
    label: t("admin.fields.BannerImage.label" as const),
    type: "file",
    accept: "image/*",
    required: true,
  },
  {
    name: "Type",
    label: t("admin.fields.Type.label" as const),
    type: "text",
    required: true,
    placeholder: t("admin.fields.Type.placeholder" as const),
  },
  {
    name: "Title",
    label: t("admin.fields.Title.label" as const),
    type: "text",
    required: true,
  },
  {
    name: "SubTitle",
    label: t("admin.fields.SubTitle.label" as const),
    type: "text",
    required: false,
  },
  {
    name: "Caption",
    label: t("admin.fields.Caption.label" as const),
    type: "textarea",
    required: false,
  },
  {
    name: "Version",
    label: t("admin.fields.Version.label" as const),
    type: "number",
    required: false,
  },
  {
    name: "ParentId",
    label: t("admin.fields.ParentId.label" as const),
    type: "text",
    required: false,
  },
  {
    name: "ScheduledStart",
    label: t("admin.fields.ScheduledStart.label" as const),
    type: "text",
    required: false,
    placeholder: t("admin.fields.ScheduledStart.placeholder" as const),
  },
  {
    name: "ScheduledEnd",
    label: t("admin.fields.ScheduledEnd.label" as const),
    type: "text",
    required: false,
    placeholder: t("admin.fields.ScheduledEnd.placeholder" as const),
  },
];

const bannerFields: FormField[] = [
  {
    name: "Image",
    label: "Banner Image",
    type: "file",
    accept: "image/*",
    required: true,
  },
  {
    name: "Type",
    label: "Type",
    type: "text",
    required: true,
    placeholder: "e.g., Hero, Promo",
  },
  { name: "Title", label: "Title", type: "text", required: true },
  { name: "SubTitle", label: "Subtitle", type: "text", required: false },
  { name: "Caption", label: "Caption", type: "textarea", required: false },
  { name: "Version", label: "Version", type: "number", required: false },
  { name: "ParentId", label: "Parent ID", type: "text", required: false },
  {
    name: "ScheduledStart",
    label: "Scheduled Start",
    type: "text",
    required: false,
    placeholder: "YYYY-MM-DDTHH:MM:SS",
  },
  {
    name: "ScheduledEnd",
    label: "Scheduled End",
    type: "text",
    required: false,
    placeholder: "YYYY-MM-DDTHH:MM:SS",
  },
];

const bannerApiEndpoint = `${process.env.NEXT_PUBLIC_API_URL || ""}/api/banners`;

// 1. Define your individual view components
// function ManageView() {
//   const columns: Column[] = [
//     { key: "title", label: "Title" },
//     { key: "type", label: "Type" },
//     { key: "subtitle", label: "Subtitle" },
//     { key: "version", label: "Version" },
//   ];

//   return (
//     <ManageList
//       title="Manage Banners"
//       apiEndpoint={bannerApiEndpoint}
//       columns={columns}
//       resourceName="Banner"
//     />
//   );
// }

function AddView() {
  return (
    <AddForms
      title="Add Banner"
      fields={bannerFields}
      apiEndpoint={bannerApiEndpoint}
    />
  );
}

function ViewAsUser() {
  return <div>{adminPlaceholders.viewAsUser}</div>;
}

// 2. Export the main Page component
export default function ManageBanner() {
  // const tabs = [
  //   { id: "manage", label: "Manage" },
  //   { id: "add", label: "Add" },
  //   { id: "preview", label: "View as user" },
  //   { id: "edit", label: "Edit" },
  // ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        {adminPageTitles.banners.heading}
      </h1>

      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher tabs={ADMIN_VIEW_TABS} defaultTab="manage">
        {{
          manage: <BannerManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: (
            <EditShell
              resourceName="Banner"
              fields={bannerFields}
              apiEndpoint={bannerApiEndpoint}
            />
          ),
        }}
      </AdminViewSwitcher>
    </div>
  );
}
