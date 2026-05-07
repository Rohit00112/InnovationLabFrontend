import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

const bentoFields: FormField[] = [
  { name: 'ImageUrl', label: 'Image (ImageUrl)', type: 'file', accept: 'image/*', required: true },
  { name: 'AltText', label: 'Alt Text', type: 'text' },
  { name: 'Caption', label: 'Caption', type: 'text' },
  { name: 'Order', label: 'Order', type: 'number' },
];

const apiEndpoint = `/api/companies/bentogridimages`;

// Manage BentoGrid images
function ManageView() {
  const columns: Column[] = [
    { key: 'ImageUrl', label: 'Image', render: (val: any) => val ? <img src={val} alt="" className="h-12 w-12 object-cover rounded" /> : '-' },
    { key: 'AltText', label: 'Alt Text' },
    { key: 'Caption', label: 'Caption' },
    { key: 'Order', label: 'Order' },
  ];

  return (
    <ManageList
      title="Manage BentoGrid Images"
      apiEndpoint={apiEndpoint}
      columns={columns}
      resourceName="BentoGrid Image"
    />
  );
}

// Add BentoGrid image
function AddView() {
  return (
    <AddForms
      title="Add BentoGrid Image"
      fields={bentoFields}
      apiEndpoint={apiEndpoint}
    />
  );
}

// View as user (preview)
function ViewAsUser() {
  return <div>User Preview Not Implemented</div>;
}

// Main Page Component
export default function CompaniesPage() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Bento-Grid Images</h1>

      <AdminViewSwitcher
        tabs={tabs}
        defaultTab="manage"
      >
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="BentoGrid Image" fields={bentoFields} apiEndpoint={apiEndpoint} />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}