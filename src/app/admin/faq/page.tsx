import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

const faqFields: FormField[] = [
  { name: "question", label: "Question", type: "text", required: true },
  { name: "answer", label: "Answer", type: "textarea", required: true },
  { name: "categoryId", label: "Category ID (Optional)", type: "text", required: false, placeholder: "UUID of category" },
];

const faqApiEndpoint = `/api/faqs`;

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
  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
      <h2 className="text-2xl font-semibold text-[var(--neutral-900)] mb-6">Frequently Asked Questions</h2>
      <div className="text-[var(--neutral-500)] text-sm">FAQ section appears here.</div>
    </div>
  );
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