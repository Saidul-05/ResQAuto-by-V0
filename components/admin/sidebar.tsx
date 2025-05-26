import {
  BarChart3,
  Building2,
  CogIcon as Cog6,
  LayoutDashboard,
  ListChecks,
  type LucideIcon,
  Settings,
  TestTube2,
  Brain,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: LucideIcon
  description?: string
}

const navigationItems: {
  [key: string]: NavItem[]
} = {
  Dashboard: [
    {
      title: "Dashboard",
      href: "/admin",
      icon: LayoutDashboard,
      description: "Overview of system performance and key metrics",
    },
  ],
  "System Configuration": [
    {
      title: "Environmental Settings",
      href: "/admin/environmental-settings",
      icon: Settings,
      description: "Configure environmental parameters",
    },
    {
      title: "Building Management",
      href: "/admin/building-management",
      icon: Building2,
      description: "Manage building structures and layouts",
    },
    {
      title: "Component Management",
      href: "/admin/component-management",
      icon: Cog6,
      description: "Manage system components and configurations",
    },
  ],
  "Testing & Validation": [
    {
      title: "Test Execution",
      href: "/admin/test-execution",
      icon: TestTube2,
      description: "Execute tests and validate system performance",
    },
    {
      title: "Adaptive Optimization",
      href: "/admin/adaptive-optimization",
      icon: Brain,
      description: "AI-powered environmental factor optimization",
    },
    {
      title: "Reporting & Analytics",
      href: "/admin/reporting-analytics",
      icon: BarChart3,
      description: "Generate reports and analyze system data",
    },
    {
      title: "Compliance Checks",
      href: "/admin/compliance-checks",
      icon: ListChecks,
      description: "Ensure compliance with regulatory standards",
    },
  ],
}

export default navigationItems
