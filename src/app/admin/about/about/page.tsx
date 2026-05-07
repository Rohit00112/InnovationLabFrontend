import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

// Module-level constants
const aboutFields: FormField[] = [
  { name: "Mission", label: "Mission", type: "textarea", required: true },
  { name: "Vision", label: "Vision", type: "textarea", required: true },
  { name: "ParentOrgName", label: "Parent Organization Name", type: "text", required: true },
  { name: "ParentOrgDescription", label: "Parent Organization Description", type: "textarea", required: true },
  { name: "ParentOrgLogo", label: "Parent Organization Logo", type: "file", accept: "image/*", required: true },
  { name: "ParentOrgWebsiteUrl", label: "Parent Organization Website URL", type: "text", required: true, placeholder: "https://example.com" },
];

const aboutApiEndpoint = `/api/about`;

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'Mission', label: 'Mission' },
    { key: 'Vision', label: 'Vision' },
    { key: 'ParentOrgName', label: 'Parent Organization' },
  ];

  return (
    <ManageList
      title="Manage About"
      apiEndpoint={aboutApiEndpoint}
      columns={columns}
      resourceName="About"
    />
  );
}

function AddView() {
  return (
    <AddForms 
      title="Add About Information" 
      fields={aboutFields} 
      apiEndpoint={aboutApiEndpoint}
    />
  );
}

function ViewAsUser() {
  return <div>Code for the User preview goes here...</div>;
}

// 2. Export the main Page component
export default function ManageAbout() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage About</h1>
      
      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher
        tabs={tabs}
        defaultTab="manage"
      >
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="About" fields={aboutFields} apiEndpoint={aboutApiEndpoint} />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}