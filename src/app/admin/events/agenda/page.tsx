import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';
import { div } from "framer-motion/client";

// Module-level constants
const agendaFields: FormField[] = [
  { name: "Title", label: "Title", type: "text", required: true },
  { name: "startTime", label: "Start Time", type: "text", required: true, placeholder: "YYYY-MM-DDTHH:MM:SS" },
  { name: "endTime", label: "End Time", type: "text", required: true, placeholder: "YYYY-MM-DDTHH:MM:SS" },
  { name: "description", label: "Description", type: "textarea", required: false },
];

const agendaApiEndpoint = `/api/events/agenda`;

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'Title', label: 'Title' },
    { key: 'startTime', label: 'Start Time' },
    { key: 'endTime', label: 'End Time' },
    { key: 'description', label: 'Description' },
  ];

  return (
    <ManageList
      title="Manage Agendas"
      apiEndpoint={agendaApiEndpoint}
      columns={columns}
      resourceName="Agenda"
    />
  );
}

function AddView() {
  return (
    <AddForms
      title="Add Agenda Item"
      fields={agendaFields}
      apiEndpoint={agendaApiEndpoint}
    />
  );
}

function ViewAsUser() {
  return <div>Code for the User preview goes here...</div>;
}

// 2. Export the main Page component
export default function ManageEventAgenda() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Event Agenda</h1>
      
      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher
        tabs={tabs}
        defaultTab="manage"
      >
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Agenda" fields={agendaFields} apiEndpoint={agendaApiEndpoint} />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}