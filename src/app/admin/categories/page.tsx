import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'name', label: 'Category Name' },
    { key: 'parentCategoryId', label: 'Parent Category ID' },
  ];

  return (
    <ManageList
      title="Manage Categories"
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories`}
      columns={columns}
      resourceName="Category"
    />
  );
}

function AddView() {
  const formFields: FormField[] = [
    { name: "name", label: "Category Name", type: "text", required: true },
    { name: "parentCategoryId", label: "Parent Category ID (Optional)", type: "text", required: false, placeholder: "UUID of parent category" },
  ];

  return (
    <AddForms 
      title="Create New Category" 
      fields={formFields} 
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/categories`}
      format="json"
    />
  );
}

function ViewAsUser() {
  return <div>Code for the User preview goes here...</div>;
}

// 2. Export the main Page component
export default function ManageCategories() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Categories</h1>
      
      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher
        tabs={tabs}
        defaultTab="manage"
      >
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Category" />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}