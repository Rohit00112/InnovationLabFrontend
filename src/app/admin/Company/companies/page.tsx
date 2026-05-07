import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';
import { div } from "framer-motion/client";

// Module-level constants
const companyFields: FormField[] = [
  { name: "Name", label: "Name", type: "text", required: true },
  { name: "Address", label: "Address", type: "text", required: true },
  { name: "ContactEmail", label: "Contact Email", type: "email", required: true },
  { name: "Priority", label: "Priority", type: "number", required: true },
  { name: "Logo", label: "Logo (Image)", type: "file", accept: "image/*", required: true },
];

const companyApiEndpoint = `/api/companies`;

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
      apiEndpoint={companyApiEndpoint}
      columns={columns}
      resourceName="Company"
    />
  );
}

function AddView() {
  return (
    <AddForms
      title="Add Company"
      fields={companyFields}
      apiEndpoint={companyApiEndpoint}
    />
  );
}

function ViewAsUser() {
  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
      <h2 className="text-2xl font-semibold text-[var(--neutral-900)] mb-6">Companies</h2>
      <div className="text-[var(--neutral-500)] text-sm">Company listing appears here.</div>
    </div>
  );
}

// 2. Export the main Page component
export default function CompaniesPage() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
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
          edit: <EditShell resourceName="Company" fields={companyFields} apiEndpoint={companyApiEndpoint} />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}
