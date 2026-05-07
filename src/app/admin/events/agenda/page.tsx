import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import ManageList, { Column } from "@/components/Admin/ManageList";
import { div } from "framer-motion/client";

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
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/events/agenda`}
      columns={columns}
      resourceName="Agenda"
    />
  );
}

function AddView() {
  return <div>Add Your Agendas Here</div>;
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
        }}
      </AdminViewSwitcher>
    </div>
  );
}