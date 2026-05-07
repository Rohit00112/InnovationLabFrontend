import ContactManageView from "@/components/Admin/ContactManageView";
import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import EditShell from "@/components/Admin/EditShell";
import { ADMIN_VIEW_TABS } from "@/constants/ui/admin";
import { adminPageTitles } from "@/constants/ui/adminPages";
import { adminPlaceholders } from "@/constants/ui/placeholders";

function ManageView() {
  return <ContactManageView />;
}

function AddView() {
  return <div>{adminPlaceholders.addForm}</div>;
}

function ViewAsUser() {
  return <div>{adminPlaceholders.viewAsUser}</div>;
}

export default function ManageContacts() {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">
        {adminPageTitles.contacts.heading}
      </h1>

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
