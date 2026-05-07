import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from "@/components/Admin/EditShell";

const categoryFields: FormField[] = [
  {
    name: "name",
    label: "Category Name",
    type: "text",
    required: true,
  },
  {
    name: "parentCategoryId",
    label: "Parent Category ID (Optional)",
    type: "text",
    required: false,
    placeholder: "UUID of parent category",
  },
];

const categoryApiEndpoint = "/api/categories";

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: "name", label: "Category Name" },
    { key: "parentCategoryId", label: "Parent Category ID" },
  ];

  return (
    <ManageList
      title="Manage Categories"
      apiEndpoint={categoryApiEndpoint}
      columns={columns}
      resourceName="Category"
    />
  );
}

function AddView() {
  return (
    <AddForms
      title="Create New Category"
      fields={categoryFields}
      apiEndpoint={categoryApiEndpoint}
      format="json"
    />
  );
}

function ViewAsUser() {
  return (
    <div className="w-full rounded-lg border border-[var(--neutral-100)] bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-semibold text-[var(--neutral-900)]">Categories</h2>
      <div className="text-sm text-[var(--neutral-500)]">Category listing appears here.</div>
    </div>
  );
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
      <h1 className="mb-6 text-2xl font-bold">Categories</h1>

      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher tabs={tabs} defaultTab="manage">
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Category" fields={categoryFields} apiEndpoint={categoryApiEndpoint} />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}
