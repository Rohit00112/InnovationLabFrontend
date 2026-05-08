import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

// Module-level constants
const journeyFields: FormField[] = [
  { name: "Title", label: "Title", type: "text", required: true },
  { name: "Description", label: "Description", type: "textarea", required: true },
  { name: "Image", label: "Image", type: "file", accept: "image/*", required: true },
  { name: "Date", label: "Date", type: "text", required: true, placeholder: "YYYY-MM-DDTHH:MM:SS" },
  { name: "Order", label: "Order", type: "number", required: false },
];

const journeyApiEndpoint = `/api/journey`;

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'Title', label: 'Title' },
    { key: 'Description', label: 'Description' },
    { key: 'Date', label: 'Date' },
    { key: 'Order', label: 'Order' },
  ];

  return (
    <ManageList
      title="Manage Journey"
      apiEndpoint={journeyApiEndpoint}
      columns={columns}
      resourceName="Journey"
    />
  );
}

function AddView() {
  return (
    <AddForms 
      title="Add Journey Milestone" 
      fields={journeyFields} 
      apiEndpoint={journeyApiEndpoint}
    />
  );
}

function ViewAsUser() {
  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
      <h2 className="text-2xl font-semibold text-[var(--neutral-900)] mb-6">Journey Timeline</h2>
      <div className="text-[var(--neutral-500)] text-sm">Journey timeline preview appears here.</div>
    </div>
  );
}

// 2. Export the main Page component
export default function ManageJourney() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Journey</h1>
      
      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher
        tabs={tabs}
        defaultTab="manage"
      >
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Journey" fields={journeyFields} apiEndpoint={journeyApiEndpoint} />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}