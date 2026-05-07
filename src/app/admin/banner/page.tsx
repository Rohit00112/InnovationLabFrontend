import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
    { key: 'subtitle', label: 'Subtitle' },
    { key: 'version', label: 'Version' },
  ];

  return (
    <ManageList
      title="Manage Banners"
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/banners`}
      columns={columns}
      resourceName="Banner"
    />
  );
}

function AddView() {
  const formFields: FormField[] = [
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

  return (
    <AddForms
      title="Add Banner"
      fields={formFields}
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ""}/api/banners`}
    />
  );
}

function ViewAsUser() {
  return <div>Code for the User preview goes here...</div>;
}

// 2. Export the main Page component
export default function ManageBanner() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Banners</h1>

      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher tabs={tabs} defaultTab="manage">
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Banner" />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}
