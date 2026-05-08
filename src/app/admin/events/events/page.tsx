import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

// Module-level constants
const eventFields: FormField[] = [
  { name: "Title", label: "Title", type: "text", required: true },
  { name: "Description", label: "Description", type: "textarea", required: true },
  { name: "Location", label: "Location", type: "text", required: true },
  { name: "CoverImage", label: "Cover Image", type: "file", accept: "image/*", required: true },
  { name: "StartTime", label: "Start Time", type: "text", required: true, placeholder: "YYYY-MM-DDTHH:MM:SS" },
  { name: "EndTime", label: "End Time", type: "text", required: true, placeholder: "YYYY-MM-DDTHH:MM:SS" },
  { name: "Highlights", label: "Highlights (comma-separated)", type: "textarea", required: false, placeholder: "Highlight 1, Highlight 2, Highlight 3" },
  { name: "SeriesName", label: "Series Name", type: "text", required: false },
  { name: "ParentEventId", label: "Parent Event ID (Optional)", type: "text", required: false, placeholder: "UUID" },
  { name: "IsTeamEvent", label: "Is Team Event (yes/no)", type: "text", required: false, placeholder: "yes or no" },
  { name: "MaxTeamMembers", label: "Max Team Members", type: "number", required: false },
  { name: "RegistrationStart", label: "Registration Start", type: "text", required: false, placeholder: "YYYY-MM-DDTHH:MM:SS" },
  { name: "RegistrationEnd", label: "Registration End", type: "text", required: false, placeholder: "YYYY-MM-DDTHH:MM:SS" },
];

const eventApiEndpoint = `/api/events`;

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'Title', label: 'Title' },
    { key: 'Location', label: 'Location' },
    { key: 'StartTime', label: 'Start Time' },
    { key: 'EndTime', label: 'End Time' },
    { key: 'SeriesName', label: 'Series' },
  ];

  return (
    <ManageList
      title="Manage Events"
      apiEndpoint={eventApiEndpoint}
      columns={columns}
      resourceName="Event"
    />
  );
}

function AddView() {
  return (
    <AddForms 
      title="Add Event" 
      fields={eventFields} 
      apiEndpoint={eventApiEndpoint}
    />
  );
}

function ViewAsUser() {
  return (
    <div className="w-full bg-white p-8 rounded-lg shadow-sm border border-[var(--neutral-100)]">
      <h2 className="text-2xl font-semibold text-[var(--neutral-900)] mb-6">Events</h2>
      <div className="text-[var(--neutral-500)] text-sm">Events preview appears here.</div>
    </div>
  );
}

// 2. Export the main Page component
export default function ManageEvents() {
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Events</h1>
      
      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher
        tabs={tabs}
        defaultTab="manage"
      >
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Event" fields={eventFields} apiEndpoint={eventApiEndpoint} />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}