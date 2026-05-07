import AddForms, { FormField } from "@/components/Admin/AddForms";
import AdminViewSwitcher from "@/components/Admin/AdminViewSwitcher";
import EditShell from "@/components/Admin/EditShell";
import EventManageView from "@/components/Admin/EventManageView";
import { ADMIN_VIEW_TABS } from "@/constants/ui/admin";
import { adminPageTitles } from "@/constants/ui/adminPages";
import { adminPlaceholders } from "@/constants/ui/placeholders";
import { t } from "@/lib/i18n/messages";

// 1. Define your individual view components
// function ManageView() {
//   const columns: Column[] = [
//     { key: 'Title', label: 'Title' },
//     { key: 'Location', label: 'Location' },
//     { key: 'StartTime', label: 'Start Time' },
//     { key: 'EndTime', label: 'End Time' },
//     { key: 'SeriesName', label: 'Series' },
//   ];

//   return (
//     <ManageList
//       title="Manage Events"
//       apiEndpoint={`${process.env.NEXT_PUBLIC_API_URL || ''}/api/events`}
//       columns={columns}
//       resourceName="Event"
//     />
//   );
// }

function AddView() {
  const formFields: FormField[] = [
    {
      name: "Title",
      label: t("admin.fields.Title.label" as const),
      type: "text",
      required: true,
    },
    {
      name: "Description",
      label: t("admin.fields.Description.label" as const),
      type: "textarea",
      required: true,
    },
    {
      name: "Location",
      label: t("admin.fields.Location.label" as const),
      type: "text",
      required: true,
    },
    {
      name: "CoverImage",
      label: t("admin.fields.CoverImage.label" as const),
      type: "file",
      accept: "image/*",
      required: true,
    },
    {
      name: "StartTime",
      label: t("admin.fields.StartTime.label" as const),
      type: "text",
      required: true,
      placeholder: t("admin.fields.StartTime.placeholder" as const),
    },
    {
      name: "EndTime",
      label: t("admin.fields.EndTime.label" as const),
      type: "text",
      required: true,
      placeholder: t("admin.fields.EndTime.placeholder" as const),
    },
    {
      name: "Highlights",
      label: t("admin.fields.Highlights.label" as const),
      type: "textarea",
      required: false,
      placeholder: t("admin.fields.Highlights.placeholder" as const),
    },
    {
      name: "SeriesName",
      label: t("admin.fields.SeriesName.label" as const),
      type: "text",
      required: false,
    },
    {
      name: "ParentEventId",
      label: t("admin.fields.ParentEventId.label" as const),
      type: "text",
      required: false,
      placeholder: t("admin.fields.ParentEventId.placeholder" as const),
    },
    {
      name: "IsTeamEvent",
      label: t("admin.fields.IsTeamEvent.label" as const),
      type: "text",
      required: false,
      placeholder: t("admin.fields.IsTeamEvent.placeholder" as const),
    },
    {
      name: "MaxTeamMembers",
      label: t("admin.fields.MaxTeamMembers.label" as const),
      type: "number",
      required: false,
    },
    {
      name: "RegistrationStart",
      label: t("admin.fields.RegistrationStart.label" as const),
      type: "text",
      required: false,
      placeholder: t("admin.fields.RegistrationStart.placeholder" as const),
    },
    {
      name: "RegistrationEnd",
      label: t("admin.fields.RegistrationEnd.label" as const),
      type: "text",
      required: false,
      placeholder: t("admin.fields.RegistrationEnd.placeholder" as const),
    },
  ];

  return (
    <AddForms
      title={adminPageTitles.events.addTitle}
      fields={formFields}
      apiEndpoint="/api/events"
    />
  );
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
        {adminPageTitles.events.heading}
      </h1>

      {/* 3. Pass the tabs mapping to the switcher */}
      <AdminViewSwitcher tabs={ADMIN_VIEW_TABS} defaultTab="manage">
        {{
          manage: <EventManageView />,
          add: <AddView />,
          preview: <ViewAsUser />,
          edit: <EditShell resourceName="Event" />,
        }}
      </AdminViewSwitcher>
    </div>
  );
}
