"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Car,
  CreditCard,
  LayoutDashboard,
  MapPin,
  Settings,
  UserCog,
  Users,
  Menu,
  LogOut,
  MessageSquare,
  FileText,
  Bell,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
} from "@/components/ui/sidebar"

interface SidebarNavigationProps {
  role: "admin" | "mechanic" | "service-provider" | "user"
}

export function DashboardSidebar({ role = "user" }: SidebarNavigationProps) {
  const pathname = usePathname()

  const routes = {
    admin: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
      { title: "Services", href: "/admin/services", icon: Car },
      { title: "Bookings", href: "/admin/bookings", icon: FileText },
      { title: "Payments", href: "/admin/payments", icon: CreditCard },
      { title: "Users", href: "/admin/users", icon: Users },
      { title: "Mechanics", href: "/admin/mechanics", icon: UserCog },
      { title: "Map Settings", href: "/admin/map-settings", icon: MapPin },
      { title: "Settings", href: "/admin/settings", icon: Settings },
    ],
    mechanic: [
      { title: "Dashboard", href: "/mechanic", icon: LayoutDashboard },
      { title: "Jobs", href: "/mechanic/jobs", icon: Car },
      { title: "Earnings", href: "/mechanic/earnings", icon: CreditCard },
      { title: "Location", href: "/mechanic/location", icon: MapPin },
      { title: "Messages", href: "/mechanic/messages", icon: MessageSquare },
      { title: "Profile", href: "/mechanic/profile", icon: UserCog },
    ],
    "service-provider": [
      { title: "Dashboard", href: "/provider", icon: LayoutDashboard },
      { title: "Services", href: "/provider/services", icon: Car },
      { title: "Orders", href: "/provider/orders", icon: FileText },
      { title: "Earnings", href: "/provider/earnings", icon: CreditCard },
      { title: "Messages", href: "/provider/messages", icon: MessageSquare },
      { title: "Profile", href: "/provider/profile", icon: UserCog },
    ],
    user: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
      { title: "My Bookings", href: "/dashboard/bookings", icon: Car },
      { title: "Payments", href: "/dashboard/payments", icon: CreditCard },
      { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
      { title: "Profile", href: "/dashboard/profile", icon: UserCog },
    ],
  }

  const routeList = routes[role]

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex items-center justify-between">
          <Link href="/" className="flex items-center px-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary">
              <span className="text-xl font-semibold text-white">RR</span>
            </div>
            <span className="ml-2 text-xl font-bold">RoadRescue</span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {routeList.map((route) => (
              <SidebarMenuItem key={route.href}>
                <SidebarMenuButton asChild isActive={pathname === route.href}>
                  <Link href={route.href}>
                    <route.icon className="h-5 w-5" />
                    <span>{route.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href="/logout">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </SidebarProvider>
  )
}

// Mobile sidebar
export function MobileSidebar({ role = "user" }: SidebarNavigationProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="md:hidden">
        <DashboardSidebar role={role} />
      </SheetContent>
    </Sheet>
  )
}
