import AboutManageView from "@/components/Admin/AboutManageView";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import EditShell from "@/components/Admin/EditShell";
import { ADMIN_VIEW_TABS } from "@/constants/ui/admin";
import { adminPageTitles } from "@/constants/ui/adminPages";
import { adminPlaceholders } from "@/constants/ui/placeholders";
import { t } from "@/lib/i18n/messages";

// 1. Define your individual view components
// function ManageView() {
//   const columns: Column[] = [
//     { key: 'Mission', label: 'Mission' },
//     { key: 'Vision', label: 'Vision' },
//     { key: 'ParentOrgName', label: 'Parent Organization' },
//   ];

//   return (
//     <ManageList
//       title="Manage About"
//       apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/about`}
//       columns={columns}
//       resourceName="About"
//     />
//   );
// }

function AddView() {
  const formFields: FormField[] = [
    {
      name: "Mission",
      label: t("admin.fields.Mission.label" as const),
      type: "textarea",
      required: true,
    },
    {
      name: "Vision",
      label: t("admin.fields.Vision.label" as const),
      type: "textarea",
      required: true,
    },
    {
      name: "ParentOrgName",
      label: t("admin.fields.ParentOrgName.label" as const),
      type: "text",
      required: true,
    },
    {
      name: "ParentOrgDescription",
      label: t("admin.fields.ParentOrgDescription.label" as const),
      type: "textarea",
      required: true,
    },
    {
      name: "ParentOrgLogo",
      label: t("admin.fields.ParentOrgLogo.label" as const),
      type: "file",
      accept: "image/*",
      required: true,
    },
    {
      name: "ParentOrgWebsiteUrl",
      label: t("admin.fields.ParentOrgWebsiteUrl.label" as const),
      type: "text",
      required: true,
      placeholder: t("admin.fields.ParentOrgWebsiteUrl.placeholder" as const),
    },
  ];

  return (
    <AddForms
      title={adminPageTitles.about.addTitle}
      fields={formFields}
      apiEndpoint="/api/about"
    />
  );
}

function ViewAsUser() {
  return <div>{adminPlaceholders.viewAsUser}</div>;
}

// 2. Export the main Page component
export default function ManageAbout() {
  // const tabs = [
  //   { id: "manage", label: "Manage" },
  //   { id: "add", label: "Add" },
  //   { id: "preview", label: "View as user" },
  //   { id: "edit", label: "Edit" },
  // ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        {adminPageTitles.about.heading}
      </h1>

      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher tabs={ADMIN_VIEW_TABS} defaultTab="manage">
        {{
          manage: <AboutManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="About" />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}
