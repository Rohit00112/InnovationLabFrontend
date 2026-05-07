import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

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
      apiEndpoint={`/api/contacts`}
      columns={columns}
      resourceName="Contact"
    />
  );
}

function AddView() {
  return <div>Code for the Add form goes here...</div>;
}

function ViewAsUser() {
  return <div>Code for the User preview goes here...</div>;
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