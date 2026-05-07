import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";

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
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/journey`}
      columns={columns}
      resourceName="Journey"
    />
  );
}

function AddView() {
  const formFields: FormField[] = [
    { name: "Title", label: "Title", type: "text", required: true },
    { name: "Description", label: "Description", type: "textarea", required: true },
    { name: "Image", label: "Image", type: "file", accept: "image/*", required: true },
    { name: "Date", label: "Date", type: "text", required: true, placeholder: "YYYY-MM-DDTHH:MM:SS" },
    { name: "Order", label: "Order", type: "number", required: false },
  ];

  return (
    <AddForms 
      title="Add Journey Milestone" 
      fields={formFields} 
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/journey`}
    />
  );
}

function ViewAsUser() {
  return <div>Code for the User preview goes here...</div>;
}

// 2. Export the main Page component
export default function ManageJourney() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
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
        }}
      </AdminViewSwitcher>
    </div>
  );
}