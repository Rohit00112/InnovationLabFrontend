import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import AddForms, { FormField } from "@/components/Admin/AddForms";
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

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
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/events`}
      columns={columns}
      resourceName="Event"
    />
  );
}

function AddView() {
  const formFields: FormField[] = [
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

  return (
    <AddForms 
      title="Add Event" 
      fields={formFields} 
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/events`}
    />
  );
}

function ViewAsUser() {
  return <div>Code for the User preview goes here...</div>;
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
          edit: <EditShell resourceName="Event" />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}