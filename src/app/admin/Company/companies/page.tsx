import AddForms, { FormField } from "@/components/Admin/AddForms";
import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import EditShell from "@/components/Admin/EditShell";
import ManageList, { Column } from "@/components/Admin/ManageList";
import { ADMIN_VIEW_TABS } from "@/constants/ui/admin";
import { adminPageTitles } from "@/constants/ui/adminPages";
import { adminPlaceholders } from "@/constants/ui/placeholders";
import { t } from "@/lib/i18n/messages";

// Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: "Name", label: "Company Name" },
    { key: "Address", label: "Address" },
    { key: "ContactEmail", label: "Contact Email" },
    { key: "Priority", label: "Priority" },
  ];

  return (
    <ManageList
      title="Manage Companies"
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ""}/api/companies`}
      columns={columns}
      resourceName="Company"
    />
  );
}

function AddView() {
  const formFields: FormField[] = [
    {
      name: "Name",
      label: t("admin.fields.Name.label" as const),
      type: "text",
      required: true,
    },
    {
      name: "Address",
      label: t("admin.fields.Address.label" as const),
      type: "text",
      required: true,
    },
    {
      name: "ContactEmail",
      label: t("admin.fields.ContactEmail.label" as const),
      type: "email",
      required: true,
    },
    {
      name: "Priority",
      label: t("admin.fields.Priority.label" as const),
      type: "number",
      required: true,
    },
    {
      name: "Logo",
      label: t("admin.fields.Logo.label" as const),
      type: "file",
      accept: "image/*",
      required: true,
    },
  ];

  return (
    <AddForms
      title={adminPageTitles.companies.addTitle}
      fields={formFields}
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ""}/api/companies`}
    />
  );
}

function ViewAsUser() {
  return <div>{adminPlaceholders.viewAsUser}</div>;
}

// 2. Export the main Page component
export default function CompaniesPage() {
  // const tabs = [
  //   { id: "manage", label: "Manage" },
  //   { id: "add", label: "Add" },
  //   { id: "preview", label: "View as user" },
  //   { id: "edit", label: "Edit" },
  // ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        {adminPageTitles.companies.heading}
      </h1>

      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher tabs={ADMIN_VIEW_TABS} defaultTab="manage">
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Company" />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}
