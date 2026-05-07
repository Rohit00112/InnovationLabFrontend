import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

const faqFields: FormField[] = [
  { name: "question", label: "Question", type: "text", required: true },
  { name: "answer", label: "Answer", type: "textarea", required: true },
  { name: "categoryId", label: "Category ID (Optional)", type: "text", required: false, placeholder: "UUID of category" },
];

const faqApiEndpoint = `${process.env.NEXT_PUBLIC_API_URL || ''}/api/faqs`;

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'question', label: 'Question' },
    { key: 'answer', label: 'Answer' },
    { key: 'categoryId', label: 'Category ID' },
  ];

  return (
    <ManageList
      title="Manage FAQ"
      apiEndpoint={faqApiEndpoint}
      columns={columns}
      resourceName="FAQ"
    />
  );
}

function AddView() {
  return (
    <AddForms 
      title="Add FAQ" 
      fields={faqFields} 
      apiEndpoint={faqApiEndpoint}
      format="json"
    />
  );
}

function ViewAsUser() {
  return <div>Code for the User preview goes here...</div>;
}

// 2. Export the main Page component
export default function ManageFAQ() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">FAQ - Frequently Asked Questions</h1>
      
      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher
        tabs={tabs}
        defaultTab="manage"
      >
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="FAQ" fields={faqFields} apiEndpoint={faqApiEndpoint} />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}