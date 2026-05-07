import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
<<<<<<< HEAD
import ContactManageView from "@/components/Admin/ContactManageView";
import { ADMIN_VIEW_TABS } from "@/constants/ui/admin";
import { adminPlaceholders } from "@/constants/ui/placeholders";
import { adminPageTitles } from "@/constants/ui/adminPages";

// 1. Define your individual view components
function ManageView() {
  return <ContactManageView />;
=======
import ManageList, { Column } from "@/components/Admin/ManageList";
import EditShell from '@/components/Admin/EditShell';

// 1. Define your individual view components
function ManageView() {
  const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'message', label: 'Message' },
    { key: 'createdAt', label: 'Submitted At' },
  ];

  return (
    <ManageList
      title="Manage Contacts"
      apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/contacts`}
      columns={columns}
      resourceName="Contact"
    />
  );
>>>>>>> origin/CompanyPageModifications
}

function AddView() {
  return <div>{adminPlaceholders.addForm}</div>;
}

function ViewAsUser() {
  return <div>{adminPlaceholders.viewAsUser}</div>;
}

// 2. Export the main Page component
export default function ManageContacts() {
<<<<<<< HEAD
=======
  const tabs = [
    { id: "manage", label: "Manage" },
    { id: "add", label: "Add" },
    { id: "preview", label: "View as user" },
    { id: "edit", label: "Edit" },
  ];

>>>>>>> origin/CompanyPageModifications
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        {adminPageTitles.contacts.heading}
      </h1>

      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher tabs={ADMIN_VIEW_TABS} defaultTab="manage">
        {{
          manage: <ManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Contact" />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}
