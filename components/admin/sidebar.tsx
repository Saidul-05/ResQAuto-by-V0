import { BarChart3, Car, LayoutDashboard, Settings, ShoppingCart, User2 } from "lucide-react"

import type { MainNavItem, SidebarNavItem } from "@/types"

interface DashboardConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "Dashboard",
      href: "/admin",
    },
    {
      title: "Users",
      href: "/admin/users",
    },
  ],
  sidebarNav: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
          description: "Overview of your dashboard.",
        },
        {
          title: "Users",
          href: "/admin/users",
          icon: User2,
          description: "Manage users.",
        },
      ],
    },
    {
      title: "Store",
      items: [
        {
          title: "Products",
          href: "/admin/products",
          icon: ShoppingCart,
          description: "Manage products.",
        },
        {
          title: "Analytics",
          href: "/admin/analytics",
          icon: BarChart3,
          description: "View store analytics.",
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          title: "Settings",
          href: "/admin/settings",
          icon: Settings,
          description: "Manage settings.",
        },
      ],
    },
    {
      title: "Testing",
      items: [
        {
          title: "Accident Flow Test",
          href: "/admin/accident-flow-test",
          icon: Car,
          description: "Test complete accident detection flow",
        },
      ],
    },
  ],
}
