import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

const testimonialFields: FormField[] = [
  { name: "Name", label: "Name", type: "text", required: true },
  { name: "Text", label: "Text", type: "textarea", required: true },
  { name: "Designation", label: "Designation", type: "text", required: true },
  { name: "Organization", label: "Organization", type: "text", required: true },
  { name: "ImageUrl", label: "Image (ImageUrl)", type: "file", accept: "image/*", required: true },
];

const testimonialApiEndpoint = `/api/testimonials`;

// Manage Testimonials
function ManageView() {
  const columns: Column[] = [
    { key: 'Name', label: 'Name' },
    { key: 'Designation', label: 'Designation' },
    { key: 'Organization', label: 'Organization' },
    { key: 'Text', label: 'Text' },
  ];

  return (
    <ManageList
      title="Manage Testimonials"
      apiEndpoint={testimonialApiEndpoint}
      columns={columns}
      resourceName="Testimonial"
    />
  );
}
// Add Testimonials
function AddView() {
  return (
    <AddForms 
      title="Add Testimonial" 
      fields={testimonialFields} 
      apiEndpoint={testimonialApiEndpoint}
    />
  );
}

// View as user
function ViewAsUser() {
  return <div>User Preview Not Implemented</div>;
}

// Main Page Component
export default function ManageTestimonials() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Testimonials</h1>
      
      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher
        tabs={tabs}
        defaultTab="manage"
      >
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Testimonial" fields={testimonialFields} apiEndpoint={testimonialApiEndpoint} />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}