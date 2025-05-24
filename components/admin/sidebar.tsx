import { Bell, LayoutDashboard, ListChecks, type LucideIcon, Settings, ShoppingCart, AlertTriangle } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  badge?: string
}

interface NavSection {
  title: string
  items: NavItem[]
}

export const sidebarConfig: NavSection[] = [
  {
    title: "General",
    items: [
      {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Products",
        href: "/admin/products",
        icon: ShoppingCart,
      },
      {
        title: "Orders",
        href: "/admin/orders",
        icon: ListChecks,
      },
    ],
  },
  {
    title: "Notifications",
    items: [
      {
        title: "Notifications",
        href: "/admin/notifications",
        icon: Bell,
      },
      {
        title: "Emergency Testing",
        href: "/admin/emergency-testing",
        icon: AlertTriangle,
        badge: "Test",
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
      },
    ],
  },
]
