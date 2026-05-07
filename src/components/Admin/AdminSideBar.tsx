"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  LayoutDashboard as Dashboard,
  Settings as SettingsIcon,
  User as UserIcon,
  ChevronDown as ChevronDownIcon,
  Plus as AddLarge,
  Eye as View,
  Menu as MenuIcon,
  X as CloseIcon,
  Calendar as CalendarIcon,
  Building2,
  Info,
  Mail,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

// Softer spring animation curve
const softSpringEasing = "cubic-bezier(0.25, 1.1, 0.4, 1)";

/* --------------------------------- Avatar -------------------------------- */

function AvatarCircle() {
  return (
    <div className="relative rounded-full shrink-0 size-8 bg-black">
      <div className="flex items-center justify-center size-8">
        <UserIcon size={16} className="text-neutral-50" />
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full border border-neutral-800 pointer-events-none"
      />
    </div>
  );
}

/* --------------------------- Types / Content Map -------------------------- */

interface MenuItemT {
  icon?: React.ReactNode;
  label: string;
  hasDropdown?: boolean;
  isActive?: boolean;
  children?: MenuItemT[];
  route?: string;
}
interface MenuSectionT {
  title: string;
  items: MenuItemT[];
}
interface SidebarContent {
  title: string;
  sections: MenuSectionT[];
}

function isExactPath(pathname: string | null, target: string) {
  return pathname === target;
}

function isPathPrefix(pathname: string | null, target: string) {
  return Boolean(
    pathname && (pathname === target || pathname.startsWith(`${target}/`)),
  );
}

function getSidebarContent(
  activeSection: string,
  pathname: string | null,
): SidebarContent {
  const contentMap: Record<string, SidebarContent> = {
    dashboard: {
      title: "Dashboard",
      sections: [
        {
          title: "Analytics",
          items: [
            {
              icon: <View size={16} className="text-neutral-50" />,
              label: "Overview",
              route: "/admin",
              isActive: isExactPath(pathname, "/admin"),
            },
          ],
        },
        {
          title: "Operations",
          items: [
            {
              label: "Banner",
              isActive: isExactPath(pathname, "/admin/banner"),
              route: "/admin/banner",
            },
            {
              // icon: <Dashboard size={16} className="text-neutral-50" />,
              label: "Categories",
              isActive: isExactPath(pathname, "/admin/categories"),
              route: "/admin/categories",
            },
            {
              // icon: <Dashboard size={16} className="text-neutral-50" />,
              label: "Frequently Asked Questions",
              isActive: isExactPath(pathname, "/admin/faq"),
              route: "/admin/faq",
            },
            {
              // icon: <Dashboard size={16} className="text-neutral-50" />,
              label: "Testimonials",
              isActive: isExactPath(pathname, "/admin/testimonials"),
              route: "/admin/testimonials",
            },
          ],
        },
      ],
    },

    // home: {
    //   title: "Home",
    //   sections: [
    //     {
    //       title: "Analytics",
    //       items: [
    //         {
    //           icon: <View size={16} className="text-neutral-50" />,
    //           label: "Overview",
    //           isActive: isExactPath(pathname, "/admin/home"),
    //           route: "/admin/home",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Operations",
    //       items: [
    //         {
    //           icon: <AddLarge size={16} className="text-neutral-50" />,
    //           label: "Create Something",
    //         },
    //       ],
    //     },
    //   ],
    // },

    // community: {
    //   title: "Community",
    //   sections: [
    //     {
    //       title: "Analytics",
    //       items: [
    //         {
    //           icon: <View size={16} className="text-neutral-50" />,
    //           label: "Overview",
    //           isActive: isExactPath(pathname, "/admin/community"),
    //           route: "/admin/community",
    //         },
    //       ],
    //     },
    //     {
    //       title: "Operations",
    //       items: [
    //         {
    //           icon: <AddLarge size={16} className="text-neutral-50" />,
    //           label: "Community",
    //           isActive: isPathPrefix(pathname, "/admin/community"),
    //           route: "/admin/community",
    //         },
    //       ],
    //     },
    //   ],
    // },

    events: {
      title: "Events",
      sections: [
        {
          title: "Analytics",
          items: [
            {
              icon: <View size={16} className="text-neutral-50" />,
              label: "Overview",
              isActive: isExactPath(pathname, "/admin/events"),
              route: "/admin/events",
            },
          ],
        },
        {
          title: "Operations",
          items: [
            {
              //icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "Events",
              isActive: isPathPrefix(pathname, "/admin/events/events"),
              route: "/admin/events/events",
            },
            {
              //icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "Agenda",
              isActive: isPathPrefix(pathname, "/admin/events/agenda"),
              route: "/admin/events/agenda",
            },
            {
              //icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "Registration",
              isActive: isPathPrefix(pathname, "/admin/events/registration"),
              route: "/admin/events/registration",
            },
          ],
        },
      ],
    },

    company: {
      title: "Company",
      sections: [
        {
          title: "Analytics",
          items: [
            {
              icon: <View size={16} className="text-neutral-50" />,
              label: "Overview",
              isActive: isExactPath(pathname, "/admin/company"),
              route: "/admin/company",
            },
          ],
        },
        {
          title: "Operations",
          items: [
            {
              //   icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "BentoGrid Images",
              isActive: isPathPrefix(
                pathname,
                "/admin/company/bentogridimages",
              ),
              route: "/admin/company/bentogridimages",
            },
            {
              //   icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "Companies",
              isActive: isPathPrefix(pathname, "/admin/company/companies"),
              route: "/admin/company/companies",
            },
            {
              //   icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "Testimonials",
              isActive: isPathPrefix(pathname, "/admin/company/testimonials"),
              route: "/admin/company/testimonials",
            },
          ],
        },
      ],
    },

    about: {
      title: "About",
      sections: [
        {
          title: "Analytics",
          items: [
            {
              icon: <View size={16} className="text-neutral-50" />,
              label: "Overview",
              isActive: isExactPath(pathname, "/admin/about"),
              route: "/admin/about",
            },
          ],
        },

        {
          title: "About",
          items: [
            {
              //icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "About",
              isActive: isPathPrefix(pathname, "/admin/about/about"),
              route: "/admin/about/about",
            },
            {
              //icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "Core Values",
              isActive: isPathPrefix(pathname, "/admin/about/core-values"),
              route: "/admin/about/core-values",
            },
            {
              //icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "Journey",
              isActive: isPathPrefix(pathname, "/admin/about/journey"),
              route: "/admin/about/journey",
            },
          ],
        },
      ],
    },

    contact: {
      title: "Contact",
      sections: [
        // {
        //   title: "Analytics",
        //   items: [
        //     {
        //       icon: <View size={16} className="text-neutral-50" />,
        //       label: "Overview",
        //       isActive: isExactPath(pathname, "/admin/contact"),
        //       route: "/admin/contact",
        //     },
        //   ],
        // },
        {
          title: "Operations",
          items: [
            {
              // icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "Contacts",
              isActive: isPathPrefix(pathname, "/admin/contact"),
              route: "/admin/contact",
            },
          ],
        },
      ],
    },

    settings: {
      title: "Settings",
      sections: [
        {
          title: "Empty",
          items: [],
        },
        {
          title: "Operations",
          items: [
            {
              icon: <AddLarge size={16} className="text-neutral-50" />,
              label: "Create Event",
            },
          ],
        },
      ],
    },
  };

  // Fall back to the dashboard content when the active section isn't known.
  return contentMap[activeSection] || contentMap.dashboard;
}

/* ---------------------------- Left Icon Nav Rail -------------------------- */

function IconNavButton({
  children,
  isActive = false,
  onClick,
}: {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      className={`flex items-center justify-center rounded-lg size-10 min-w-10 transition-colors duration-500
        ${isActive ? "bg-neutral-800 text-neutral-50 border-l-4 border-cyan-500" : "hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300"}`}
      style={{ transitionTimingFunction: softSpringEasing }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function IconNavigation({
  activeSection,
  onSectionChange,
  onNavigate,
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const navItems = [
    { id: "dashboard", icon: <Dashboard size={16} />, label: "Dashboard" },
    // { id: "home", icon: <Home size={16} />, label: "Home" },
    // { id: "community", icon: <Users size={16} />, label: "Community" },
    { id: "events", icon: <CalendarIcon size={16} />, label: "Events" },
    { id: "company", icon: <Building2 size={16} />, label: "Company" },
    { id: "about", icon: <Info size={16} />, label: "About" },
    { id: "contact", icon: <Mail size={16} />, label: "Contact" },
  ];

  return (
    <aside className="relative bg-neutral-100 flex flex-col gap-2 items-center p-4 w-16 h-full border-r border-neutral-200 rounded-none overflow-y-auto no-scrollbar">
      {/* Logo */}
      <div className="mb-2 size-10 flex items-center justify-center">
        <div className="size-7">
          <Image
            src="/ivLabsLogo.svg"
            alt="Innovation Lab"
            width={28}
            height={28}
            priority
          />
        </div>
      </div>

      {/* Navigation Icons */}
      <div className="flex flex-col gap-2 w-full items-center">
        {navItems.map((item) => (
          <IconNavButton
            key={item.id}
            isActive={activeSection === item.id}
            onClick={() => {
              onSectionChange(item.id);
              onNavigate?.();
              router.push(
                item.id === "dashboard" ? "/admin" : `/admin/${item.id}`,
              );
            }}
          >
            {item.icon}
          </IconNavButton>
        ))}
      </div>

      {/* Bottom section */}
      <div className="absolute bottom-4 left-0 right-0 flex flex-col gap-2 items-center">
        <IconNavButton
          isActive={activeSection === "settings"}
          onClick={() => {
            onSectionChange("settings");
            onNavigate?.();
            router.push(`/admin/settings`);
          }}
        >
          <SettingsIcon size={16} />
        </IconNavButton>
        <div className="size-8">
          <AvatarCircle />
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------ Right Sidebar ----------------------------- */

function SectionTitle({
  title,
  onToggleCollapse,
  isCollapsed,
}: {
  title: string;
  onToggleCollapse: () => void;
  isCollapsed: boolean;
}) {
  if (isCollapsed) {
    return (
      <div
        className="w-full flex justify-center transition-all duration-500"
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        <button
          type="button"
          onClick={onToggleCollapse}
          className="flex items-center justify-center rounded-lg size-10 min-w-10 transition-all duration-500 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300"
          style={{ transitionTimingFunction: softSpringEasing }}
          aria-label="Expand sidebar"
        >
          <span className="inline-block rotate-180">
            <ChevronDownIcon size={16} />
          </span>
        </button>
      </div>
    );
  }

  return (
    <div
      className="w-full overflow-hidden transition-all duration-500"
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center h-10">
          <div className="px-2 py-1">
            <div className="font-['Lexend:SemiBold',sans-serif] text-[18px] text-neutral-50 leading-6.75">
              {title}
            </div>
          </div>
        </div>
        <div className="pr-1">
          <button
            type="button"
            onClick={onToggleCollapse}
            className="flex items-center justify-center rounded-lg size-10 min-w-10 transition-all duration-500 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-300"
            style={{ transitionTimingFunction: softSpringEasing }}
            aria-label="Collapse sidebar"
          >
            <ChevronDownIcon size={16} className="-rotate-90" />
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailSidebar({ activeSection }: { activeSection: string }) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const content = getSidebarContent(activeSection, pathname);

  const toggleExpanded = (itemKey: string) => {
    setExpandedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemKey)) next.delete(itemKey);
      else next.add(itemKey);
      return next;
    });
  };

  const toggleCollapse = () => setIsCollapsed((s) => !s);

  return (
    <aside
      className={`relative bg-neutral-100 flex flex-col gap-4 items-start p-4 rounded-r-2xl border-r border-neutral-200 transition-all duration-500 h-full min-h-0 overflow-hidden ${
        isCollapsed
          ? "w-16 min-w-16 px-0! justify-center"
          : "w-[min(15.3rem,calc(100vw-6rem))] md:w-72"
      }`}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <SectionTitle
        title={content.title}
        onToggleCollapse={toggleCollapse}
        isCollapsed={isCollapsed}
      />
      {/* <SearchContainer isCollapsed={isCollapsed} /> */}

      <div className="flex min-h-0 w-full flex-1 flex-col">
        <div
          className={`flex flex-col w-full flex-1 min-h-0 overflow-y-auto no-scrollbar overscroll-contain transition-all duration-500 ${
            isCollapsed ? "gap-2 items-center" : "gap-4 items-start"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          {content.sections.map((section, index) => (
            <MenuSection
              key={`${activeSection}-${index}`}
              section={section}
              expandedItems={expandedItems}
              onToggleExpanded={toggleExpanded}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

/* ------------------------------ Menu Elements ---------------------------- */

function MenuItem({
  item,
  isExpanded,
  onToggle,
  onItemClick,
  isCollapsed,
}: {
  item: MenuItemT;
  isExpanded?: boolean;
  onToggle?: () => void;
  onItemClick?: () => void;
  isCollapsed?: boolean;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (item.route && !item.hasDropdown) {
      router.push(item.route);
      return;
    }

    if (item.hasDropdown && onToggle) onToggle();
    else onItemClick?.();
  };

  return (
    <div
      className={`relative shrink-0 transition-all duration-500 ${
        isCollapsed ? "w-full flex justify-center" : "w-full"
      }`}
      style={{ transitionTimingFunction: softSpringEasing }}
    >
      <div
        className={`rounded-lg cursor-pointer transition-all duration-500 flex items-center relative ${
          item.isActive ? "bg-cyan-400" : "hover:bg-neutral-800"
        } ${isCollapsed ? "w-10 min-w-10 h-10 justify-center p-4" : "w-full h-10 px-4 py-2"}`}
        style={{ transitionTimingFunction: softSpringEasing }}
        onClick={handleClick}
        title={isCollapsed ? item.label : undefined}
      >
        <div className="flex items-center justify-center shrink-0">
          {item.icon && item.isActive ? (
            <div className="text-black">{item.icon}</div>
          ) : (
            item.icon
          )}
        </div>

        <div
          className={`flex-1 relative transition-opacity duration-500 overflow-hidden ${
            isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-3"
          }`}
          style={{ transitionTimingFunction: softSpringEasing }}
        >
          <div
            className={`font-['Lexend:Regular',sans-serif] text-[14px] ${item.isActive ? "text-black" : "text-neutral-50"} leading-5 truncate`}
          >
            {item.label}
          </div>
        </div>

        {item.hasDropdown && (
          <div
            className={`flex items-center justify-center shrink-0 transition-opacity duration-500 ${
              isCollapsed ? "opacity-0 w-0" : "opacity-100 ml-2"
            }`}
            style={{ transitionTimingFunction: softSpringEasing }}
          >
            <ChevronDownIcon
              size={16}
              className={`transition-transform duration-500 ${item.isActive ? "text-black" : "text-neutral-50"}`}
              style={{
                transitionTimingFunction: softSpringEasing,
                transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function SubMenuItem({
  item,
  onItemClick,
}: {
  item: MenuItemT;
  onItemClick?: () => void;
}) {
  const router = useRouter();

  const handleClick = () => {
    if (item.route) {
      router.push(item.route);
    }
    onItemClick?.();
  };

  return (
    <div className="w-full pl-9 pr-1 py-px">
      <div
        className="h-10 w-full rounded-lg cursor-pointer transition-colors hover:bg-neutral-800 flex items-center px-3 py-1"
        onClick={handleClick}
      >
        <div className="flex-1 min-w-0">
          <div className="font-['Lexend:Regular',sans-serif] text-[14px] text-neutral-300 leading-4.5 truncate">
            {item.label}
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuSection({
  section,
  expandedItems,
  onToggleExpanded,
  isCollapsed,
}: {
  section: MenuSectionT;
  expandedItems: Set<string>;
  onToggleExpanded: (itemKey: string) => void;
  isCollapsed?: boolean;
}) {
  return (
    <div className="flex flex-col w-full">
      <div
        className={`relative shrink-0 w-full transition-all duration-500 overflow-hidden ${
          isCollapsed ? "h-0 opacity-0" : "h-10 opacity-100"
        }`}
        style={{ transitionTimingFunction: softSpringEasing }}
      >
        <div className="flex items-center h-10 px-4">
          <div className="font-['Lexend:Regular',sans-serif] text-[14px] text-neutral-400">
            {section.title}
          </div>
        </div>
      </div>

      {section.items.map((item, index) => {
        const itemKey = `${section.title}-${index}`;
        const isExpanded = expandedItems.has(itemKey);
        return (
          <div key={itemKey} className="w-full flex flex-col">
            <MenuItem
              item={item}
              isExpanded={isExpanded}
              onToggle={() => onToggleExpanded(itemKey)}
              onItemClick={() => console.log(`Clicked ${item.label}`)}
              isCollapsed={isCollapsed}
            />
            {isExpanded && item.children && !isCollapsed && (
              <div className="flex flex-col gap-1 mb-2">
                {item.children.map((child, childIndex) => (
                  <SubMenuItem
                    key={`${itemKey}-${childIndex}`}
                    item={child}
                    onItemClick={() => console.log(`Clicked ${child.label}`)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* --------------------------------- Layout -------------------------------- */

function TwoLevelSidebar({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const activeSection = (() => {
    if (!pathname) {
      return "dashboard";
    }

    const parts = pathname.split("/").filter(Boolean);
    if (parts[0] !== "admin") {
      return "dashboard";
    }

    const section = parts[1] || "dashboard";
    const dashboardRoutes = new Set([
      "faq",
      "testimonials",
      "banner",
      "categories",
    ]);

    return dashboardRoutes.has(section) ? "dashboard" : section;
  })();

  return (
    <div className="flex h-full min-h-0 flex-row items-stretch overflow-hidden">
      <IconNavigation
        activeSection={activeSection}
        onSectionChange={() => undefined}
        onNavigate={onNavigate}
      />
      <DetailSidebar activeSection={activeSection} />
    </div>
  );
}

/* ------------------------------- Root Frame ------------------------------ */

export function AdminSideBar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      <div className="admin-sidebar sticky top-0 h-dvh w-auto shrink-0 overflow-hidden self-stretch bg-neutral-100">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="md:hidden fixed left-4 top-4 z-50 flex size-10 items-center justify-center rounded-lg border border-neutral-800 bg-black text-neutral-50"
          aria-label="Open sidebar"
        >
          <MenuIcon size={18} />
        </button>

        {isMobileOpen && (
          <button
            type="button"
            className="md:hidden fixed inset-0 z-40 bg-black/20"
            aria-label="Close sidebar overlay"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        <div
          className={`fixed md:static left-0 top-0 z-50 md:z-auto h-dvh p-0 transition-transform duration-300 ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="flex h-full flex-row items-stretch">
            <div className="md:hidden mb-2 flex justify-end">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                className="flex size-10 items-center justify-center rounded-lg border border-neutral-800 bg-black text-neutral-50"
                aria-label="Close sidebar"
              >
                <CloseIcon size={18} />
              </button>
            </div>

            <TwoLevelSidebar onNavigate={() => setIsMobileOpen(false)} />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .admin-sidebar .bg-black,
        .admin-sidebar .bg-\[\#1a1a1a\] {
          background-color: #ffffff !important;
        }

        .admin-sidebar .bg-neutral-800 {
          background-color: #f5f5f5 !important;
        }

        .admin-sidebar .border-neutral-800 {
          border-color: #e5e5e5 !important;
        }

        .admin-sidebar .text-neutral-50 {
          color: #171717 !important;
        }

        .admin-sidebar .text-neutral-400 {
          color: #525252 !important;
        }

        .admin-sidebar .text-neutral-300 {
          color: #737373 !important;
        }

        .admin-sidebar .placeholder\:text-neutral-400::placeholder {
          color: #737373 !important;
        }

        .admin-sidebar .hover\:bg-neutral-800:hover {
          background-color: #f5f5f5 !important;
        }

        .admin-sidebar .hover\:text-neutral-300:hover {
          color: #404040 !important;
        }

        .admin-sidebar .bg-black {
          background-color: #ffffff !important;
        }

        .admin-sidebar .bg-cyan-400 {
          background-color: #06b6d4 !important;
        }

        .admin-sidebar .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .admin-sidebar .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
}

export default AdminSideBar;
