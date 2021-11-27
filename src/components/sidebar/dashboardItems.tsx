import { SidebarItemsType } from "../../types/sidebar";

import { Calendar, CheckSquare, Book, Settings } from "react-feather";

const pagesSection = [
  {
    href: "/inbox",
    icon: CheckSquare,
    title: "Inbox",
  },
  {
    href: "/logbook",
    icon: Book,
    title: "Logbook",
  },
  {
    href: "/calendar",
    icon: Calendar,
    title: "Calendar",
  },
  {
    href: "/settings",
    icon: Settings,
    title: "Settings",
  },
] as SidebarItemsType[];

const navItems = [
  {
    title: "Pages",
    pages: pagesSection,
  },
];

export default navItems;
