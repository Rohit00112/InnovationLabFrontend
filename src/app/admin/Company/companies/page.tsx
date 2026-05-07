import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import { div } from "framer-motion/client";

// Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'Name', label: 'Company Name' },
    { key: 'Address', label: 'Address' },
    { key: 'ContactEmail', label: 'Contact Email' },
    { key: 'Priority', label: 'Priority' },
  ];

  return (
    <ManageList
      title="Manage Companies"
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/companies`}
      columns={columns}
      resourceName="Company"
    />
  );
}

function AddView() {
  const formFields: FormField[] = [
    { name: "Name", label: "Name", type: "text", required: true },
    { name: "Address", label: "Address", type: "text", required: true },
    {
      name: "ContactEmail",
      label: "Contact Email",
      type: "email",
      required: true,
    },
    { name: "Priority", label: "Priority", type: "number", required: true },
    {
      name: "Logo",
      label: "Logo (Image)",
      type: "file",
      accept: "image/*",
      required: true,
    },
  ];

  return (
    <AddForms
      title="Add Company"
      fields={formFields}
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ""}/api/companies`}
    />
  );
}

function ViewAsUser() {
  return <div>Code for the User preview goes here...</div>;
}

// 2. Export the main Page component
export default function CompaniesPage() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Companies</h1>

      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher tabs={tabs} defaultTab="manage">
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}
