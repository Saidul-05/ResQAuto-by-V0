"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Car,
  Calendar,
  CreditCard,
  Settings,
  Map,
  Shield,
  Database,
  Home,
  Megaphone,
  Activity,
  BarChart3,
  Zap,
  Brain,
  Network,
  GitBranch,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Layers,
} from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Car,
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: Calendar,
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
  {
    title: "Map Settings",
    href: "/admin/map-settings",
    icon: Map,
  },
  {
    title: "Features",
    href: "/admin/features",
    icon: Activity,
  },
  {
    title: "Home Shield",
    href: "/admin/home-shield",
    icon: Shield,
  },
  {
    title: "Home Slider",
    href: "/admin/home-slider",
    icon: Home,
  },
  {
    title: "Ads Management",
    href: "/admin/ads",
    icon: Megaphone,
  },
  {
    title: "Backend Settings",
    href: "/admin/backend-settings",
    icon: Database,
  },
  {
    title: "Database",
    href: "/admin/database",
    icon: Database,
  },
  {
    title: "Blog Editor",
    href: "/admin/blog/editor",
    icon: Megaphone,
  },
  {
    title: "Testing",
    href: "#",
    icon: Zap,
    children: [
      {
        title: "Notifications",
        href: "/admin/notifications",
        icon: Activity,
      },
      {
        title: "Test Notifications",
        href: "/admin/test-notifications",
        icon: CheckCircle,
      },
      {
        title: "Emergency Testing",
        href: "/admin/emergency-testing",
        icon: AlertTriangle,
      },
      {
        title: "Accident Flow Test",
        href: "/admin/accident-flow-test",
        icon: Car,
      },
      {
        title: "Unresponsive Test",
        href: "/admin/unresponsive-test",
        icon: Clock,
      },
      {
        title: "Late Response Test",
        href: "/admin/late-response-test",
        icon: TrendingUp,
      },
      {
        title: "Identity Verification",
        href: "/admin/identity-verification-test",
        icon: Shield,
      },
      {
        title: "Biometric Test",
        href: "/admin/biometric-test",
        icon: Target,
      },
      {
        title: "Multi-Modal Test",
        href: "/admin/multi-modal-test",
        icon: Layers,
      },
      {
        title: "Adaptive Algorithm",
        href: "/admin/adaptive-algorithm-test",
        icon: Brain,
      },
      {
        title: "Iterative Learning",
        href: "/admin/iterative-learning-test",
        icon: GitBranch,
      },
      {
        title: "Scenario Learning",
        href: "/admin/scenario-learning-test",
        icon: Network,
      },
      {
        title: "Learning Transfer",
        href: "/admin/learning-transfer-test",
        icon: TrendingUp,
      },
      {
        title: "Real-World Validation",
        href: "/admin/real-world-validation",
        icon: Database,
      },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="pb-12 w-64">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Admin Panel</h2>
          <div className="space-y-1">
            {sidebarItems.map((item) => (
              <div key={item.href}>
                {item.children ? (
                  <div className="space-y-1">
                    <div className="flex items-center rounded-lg px-3 py-2 text-sm font-medium">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </div>
                    <div className="ml-6 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className={cn(
                            "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                            pathname === child.href ? "bg-accent text-accent-foreground" : "transparent",
                          )}
                        >
                          <child.icon className="mr-2 h-3 w-3" />
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "transparent",
                    )}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    {item.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
