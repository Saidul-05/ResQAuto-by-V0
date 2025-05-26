"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart3,
  CogIcon as Cog6,
  LayoutDashboard,
  type LucideIcon,
  Settings,
  TestTube2,
  Brain,
  Menu,
  Users,
  Database,
  MapPin,
  Wrench,
  CreditCard,
  Calendar,
  Bell,
  Shield,
  Activity,
  FileText,
  ImageIcon,
  Megaphone,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
  Globe,
  Smartphone,
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
    {
      title: "Analytics",
      href: "/admin/analytics",
      icon: BarChart3,
      description: "Detailed analytics and reporting",
    },
  ],
  "User Management": [
    {
      title: "Users",
      href: "/admin/users",
      icon: Users,
      description: "Manage user accounts and permissions",
    },
    {
      title: "Services",
      href: "/admin/services",
      icon: Wrench,
      description: "Manage service providers and mechanics",
    },
    {
      title: "Bookings",
      href: "/admin/bookings",
      icon: Calendar,
      description: "View and manage service bookings",
    },
    {
      title: "Payments",
      href: "/admin/payments",
      icon: CreditCard,
      description: "Payment processing and transactions",
    },
  ],
  "System Configuration": [
    {
      title: "Database",
      href: "/admin/database",
      icon: Database,
      description: "Database management and initialization",
    },
    {
      title: "Backend Settings",
      href: "/admin/backend-settings",
      icon: Settings,
      description: "Configure backend services",
    },
    {
      title: "Map Settings",
      href: "/admin/map-settings",
      icon: MapPin,
      description: "Configure map services and settings",
    },
    {
      title: "Features",
      href: "/admin/features",
      icon: Zap,
      description: "Enable/disable system features",
    },
  ],
  "Content Management": [
    {
      title: "Home Shield",
      href: "/admin/home-shield",
      icon: Shield,
      description: "Manage home protection services",
    },
    {
      title: "Home Slider",
      href: "/admin/home-slider",
      icon: ImageIcon,
      description: "Manage homepage slider content",
    },
    {
      title: "Ads",
      href: "/admin/ads",
      icon: Megaphone,
      description: "Manage advertisements and promotions",
    },
    {
      title: "Blog Editor",
      href: "/admin/blog/editor",
      icon: FileText,
      description: "Create and edit blog posts",
    },
  ],
  "Emergency & Testing": [
    {
      title: "Emergency Testing",
      href: "/admin/emergency-testing",
      icon: AlertTriangle,
      description: "Test emergency response systems",
    },
    {
      title: "Notifications",
      href: "/admin/notifications",
      icon: Bell,
      description: "Manage notification systems",
    },
    {
      title: "Test Notifications",
      href: "/admin/test-notifications",
      icon: TestTube2,
      description: "Test notification delivery",
    },
    {
      title: "Accident Flow Test",
      href: "/admin/accident-flow-test",
      icon: Activity,
      description: "Test accident detection flow",
    },
  ],
  "Advanced Testing": [
    {
      title: "Unresponsive Test",
      href: "/admin/unresponsive-test",
      icon: Target,
      description: "Test unresponsive user scenarios",
    },
    {
      title: "Late Response Test",
      href: "/admin/late-response-test",
      icon: TrendingUp,
      description: "Test late response handling",
    },
    {
      title: "Identity Verification",
      href: "/admin/identity-verification-test",
      icon: CheckCircle,
      description: "Test identity verification systems",
    },
    {
      title: "Biometric Test",
      href: "/admin/biometric-test",
      icon: Smartphone,
      description: "Test biometric verification",
    },
  ],
  "AI & Optimization": [
    {
      title: "Multi-Modal Test",
      href: "/admin/multi-modal-test",
      icon: Brain,
      description: "Test multi-modal biometric systems",
    },
    {
      title: "Adaptive Algorithm",
      href: "/admin/adaptive-algorithm-test",
      icon: Cog6,
      description: "Test adaptive learning algorithms",
    },
    {
      title: "Iterative Learning",
      href: "/admin/iterative-learning-test",
      icon: TrendingUp,
      description: "Test iterative learning systems",
    },
    {
      title: "Scenario Learning",
      href: "/admin/scenario-learning-test",
      icon: Target,
      description: "Test scenario-specific learning",
    },
    {
      title: "Learning Transfer",
      href: "/admin/learning-transfer-test",
      icon: Globe,
      description: "Test learning transfer capabilities",
    },
    {
      title: "Real-World Validation",
      href: "/admin/real-world-validation",
      icon: CheckCircle,
      description: "Validate real-world performance",
    },
    {
      title: "Validation Results",
      href: "/admin/validation-results",
      icon: BarChart3,
      description: "View validation results",
    },
    {
      title: "Environmental Settings",
      href: "/admin/environmental-settings",
      icon: Settings,
      description: "Configure environmental parameters",
    },
    {
      title: "Adaptive Optimization",
      href: "/admin/adaptive-optimization",
      icon: Brain,
      description: "AI-powered environmental factor optimization",
    },
  ],
}

interface SidebarProps {
  className?: string
}

export function AdminSidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div className={cn("pb-12", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Admin Panel</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-6">
              {Object.entries(navigationItems).map(([category, items]) => (
                <div key={category} className="px-3">
                  <h3 className="mb-2 px-4 text-sm font-medium text-muted-foreground">{category}</h3>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <Button
                        key={item.href}
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                      >
                        <Link href={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
}

export function MobileAdminSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="px-1">
          <h2 className="mb-4 px-4 text-lg font-semibold tracking-tight">Admin Panel</h2>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            <div className="space-y-6">
              {Object.entries(navigationItems).map(([category, items]) => (
                <div key={category} className="px-3">
                  <h3 className="mb-2 px-4 text-sm font-medium text-muted-foreground">{category}</h3>
                  <div className="space-y-1">
                    {items.map((item) => (
                      <Button
                        key={item.href}
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        asChild
                        onClick={() => setOpen(false)}
                      >
                        <Link href={item.href}>
                          <item.icon className="mr-2 h-4 w-4" />
                          {item.title}
                        </Link>
                      </Button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Keep the default export for backward compatibility
export default navigationItems
