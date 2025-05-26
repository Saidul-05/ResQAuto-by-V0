import { BarChart, Building2, Calendar, Cloud, Home, ListChecks, Settings, User2 } from "lucide-react"

import type { MainNavItem, SidebarNavItem } from "@/types"

interface DashboardConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Documentation",
      href: "/docs",
    },
    {
      title: "Support",
      href: "/support",
      disabled: true,
    },
  ],
  sidebarNav: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: Home,
    },
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart,
    },
    {
      title: "Users",
      href: "/admin/users",
      icon: User2,
    },
    {
      title: "Buildings",
      href: "/admin/buildings",
      icon: Building2,
    },
    {
      title: "Emergency Testing",
      items: [
        {
          title: "Emergency Test",
          href: "/admin/emergency-test",
          icon: ListChecks,
        },
        {
          title: "Environmental Transfer Test",
          href: "/admin/environmental-transfer-test",
          icon: Cloud,
        },
      ],
    },
    {
      title: "Calendar",
      href: "/admin/calendar",
      icon: Calendar,
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ],
}
