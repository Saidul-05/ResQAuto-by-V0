import {
  BarChart3,
  Building2,
  Fingerprint,
  LayoutDashboard,
  ListChecks,
  type LucideIcon,
  Settings,
  User2,
  UserCheck,
  Layers,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
}

interface NavSection {
  title: string
  items: NavItem[]
}

const sidebarConfig: NavSection[] = [
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
        title: "Users",
        href: "/admin/users",
        icon: User2,
      },
      {
        title: "Organizations",
        href: "/admin/organizations",
        icon: Building2,
      },
    ],
  },
  {
    title: "Emergency Testing",
    items: [
      {
        title: "Identity Verification Test",
        href: "/admin/identity-verification-test",
        icon: UserCheck,
      },
      {
        title: "Biometric Testing",
        href: "/admin/biometric-test",
        icon: Fingerprint,
      },
      {
        title: "Multi-Modal Testing",
        href: "/admin/multi-modal-test",
        icon: Layers,
      },
      {
        title: "Checklist Test",
        href: "/admin/checklist-test",
        icon: ListChecks,
      },
    ],
  },
  {
    title: "Analytics",
    items: [
      {
        title: "Dashboard",
        href: "/admin/analytics",
        icon: BarChart3,
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

export default sidebarConfig
