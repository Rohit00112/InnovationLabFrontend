import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

const contactFields: FormField[] = [
  { name: 'name', label: 'Name', type: 'text', required: true },
  { name: 'email', label: 'Email', type: 'email', required: true },
  { name: 'message', label: 'Message', type: 'textarea', required: true },
];

const contactApiEndpoint = `/api/contacts`;

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'message', label: 'Message' },
    { key: 'createdAt', label: 'Submitted At' },
  ];

  return (
    <ManageList
      title="Manage Contacts"
      apiEndpoint={contactApiEndpoint}
      columns={columns}
      resourceName="Contact"
    />
  );
}

function AddView() {
  return (
    <AddForms
      title="Add Contact"
      fields={contactFields}
      apiEndpoint={contactApiEndpoint}
      format="json"
    />
  );
}

function ViewAsUser() {
  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
      <h2 className="text-2xl font-semibold text-[var(--neutral-900)] mb-6">Contact Messages</h2>
      <div className="text-[var(--neutral-500)] text-sm">Messages submitted through the contact form will appear here.</div>
    </div>
  );
}

// 2. Export the main Page component
export default function ManageContacts() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Contacts</h1>
      
      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher
        tabs={tabs}
        defaultTab="manage"
      >
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Contact" />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}