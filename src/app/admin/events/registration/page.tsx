import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import EditShell from "@/components/Admin/EditShell";
import ManageList, { Column } from "@/components/Admin/ManageList";
import { ADMIN_VIEW_TABS } from "@/constants/ui/admin";
import { adminPageTitles } from "@/constants/ui/adminPages";
import { adminPlaceholders } from "@/constants/ui/placeholders";

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: "eventId", label: "Event ID" },
    { key: "userId", label: "User ID" },
    { key: "status", label: "Status" },
    { key: "createdAt", label: "Registered At" },
  ];

  return (
    <ManageList
      title="Manage Registrations"
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ""}/api/events/registrations`}
      columns={columns}
      resourceName="Registration"
    />
  );
}

function AddView() {
  return <div>{adminPlaceholders.notReady}</div>;
}

function ViewAsUser() {
  return <div>{adminPlaceholders.viewAsUser}</div>;
}

// 2. Export the main Page component
export default function ManageEvents() {
  // const tabs = [
  //   { id: "manage", label: "Manage" },
  //   { id: "add", label: "Add" },
  //   { id: "preview", label: "View as user" },
  //   { id: "edit", label: "Edit" },
  // ];

  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        {adminPageTitles.eventRegistration.heading}
      </h1>

      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher tabs={ADMIN_VIEW_TABS} defaultTab="manage">
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Registration" />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}
