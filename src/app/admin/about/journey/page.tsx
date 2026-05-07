import AddForms, { FormField } from "@/components/Admin/AddForms";
import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import EditShell from "@/components/Admin/EditShell";
import JourneyManageView from "@/components/Admin/JourneyManageView";
import { ADMIN_VIEW_TABS } from "@/constants/ui/admin";
import { adminPageTitles } from "@/constants/ui/adminPages";
import { adminPlaceholders } from "@/constants/ui/placeholders";
import { t } from "@/lib/i18n/messages";

// 1. Define your individual view components
// function ManageView() {
//   const columns: Column[] = [
//     { key: 'Title', label: 'Title' },
//     { key: 'Description', label: 'Description' },
//     { key: 'Date', label: 'Date' },
//     { key: 'Order', label: 'Order' },
//   ];

//   return (
//     <ManageList
//       title="Manage Journey"
//       apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/journey`}
//       columns={columns}
//       resourceName="Journey"
//     />
//   );
// }

function AddView() {
  const formFields: FormField[] = [
    {
      name: "Title",
      label: t("admin.fields.Title.label" as const),
      type: "text",
      required: true,
    },
    {
      name: "Description",
      label: t("admin.fields.Description.label" as const),
      type: "textarea",
      required: true,
    },
    {
      name: "Image",
      label: t("admin.fields.Image.label" as const),
      type: "file",
      accept: "image/*",
      required: true,
    },
    {
      name: "Date",
      label: t("admin.fields.Date.label" as const),
      type: "text",
      required: true,
      placeholder: t("admin.fields.Date.placeholder" as const),
    },
    {
      name: "Order",
      label: t("admin.fields.Order.label" as const),
      type: "number",
      required: false,
    },
  ];

  return (
    <AddForms
      title={adminPageTitles.journey.addTitle}
      fields={formFields}
      apiEndpoint="/api/journey"
    />
  );
}

function ViewAsUser() {
  return <div>{adminPlaceholders.viewAsUser}</div>;
}

// 2. Export the main Page component
export default function ManageJourney() {
  // const tabs = [
  //   { id: "manage", label: "Manage" },
  //   { id: "add", label: "Add" },
  //   { id: "preview", label: "View as user" },
  //   { id: "edit", label: "Edit" },
  // ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        {adminPageTitles.journey.heading}
      </h1>

      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher tabs={ADMIN_VIEW_TABS} defaultTab="manage">
        {{
          manage: <JourneyManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Journey" />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}
