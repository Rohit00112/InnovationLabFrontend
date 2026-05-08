import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

// Module-level constants
const coreValueFields: FormField[] = [
  { name: "Title", label: "Title", type: "text", required: true },
  { name: "Description", label: "Description", type: "textarea", required: true },
  { name: "Icon", label: "Icon", type: "file", accept: "image/*", required: true },
  { name: "Order", label: "Order", type: "number", required: false },
];

const coreValueApiEndpoint = `/api/core-values`;

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'Title', label: 'Title' },
    { key: 'Description', label: 'Description' },
    { key: 'Order', label: 'Order' },
  ];

  return (
    <ManageList
      title="Manage Core Values"
      apiEndpoint={coreValueApiEndpoint}
      columns={columns}
      resourceName="Core Value"
    />
  );
}

function AddView() {
  return (
    <AddForms 
      title="Add Core Value" 
      fields={coreValueFields} 
      apiEndpoint={coreValueApiEndpoint}
    />
  );
}

function ViewAsUser() {
  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
      <h2 className="text-2xl font-semibold text-[var(--neutral-900)] mb-6">Core Values</h2>
      <div className="text-[var(--neutral-500)] text-sm">Core values preview appears here.</div>
    </div>
  );
}

// 2. Export the main Page component
export default function ManageCoreValues() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Core Values</h1>
      
      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher
        tabs={tabs}
        defaultTab="manage"
      >
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Core Value" fields={coreValueFields} apiEndpoint={coreValueApiEndpoint} />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}