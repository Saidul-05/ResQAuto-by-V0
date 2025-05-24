"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  Database,
  Map,
  CreditCard,
  Car,
  FileText,
  BarChart,
  Menu,
  LogOut,
  Image,
  Layers,
  Server,
  Shield,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
    color: "text-sky-500",
  },
  {
    label: "Services",
    icon: Car,
    href: "/admin/services",
    color: "text-violet-500",
  },
  {
    label: "Bookings",
    icon: FileText,
    href: "/admin/bookings",
    color: "text-pink-700",
  },
  {
    label: "Users",
    icon: Users,
    href: "/admin/users",
    color: "text-orange-700",
  },
  {
    label: "Payments",
    icon: CreditCard,
    href: "/admin/payments",
    color: "text-emerald-500",
  },
  {
    label: "Analytics",
    icon: BarChart,
    href: "/admin/analytics",
    color: "text-green-700",
  },
  {
    label: "Homepage Slider",
    icon: Layers,
    href: "/admin/home-slider",
    color: "text-blue-500",
  },
  {
    label: "Ads Management",
    icon: Image,
    href: "/admin/ads",
    color: "text-red-500",
  },
  {
    label: "HomeShield",
    icon: Shield,
    href: "/admin/home-shield",
    color: "text-amber-500",
  },
  {
    label: "Features",
    icon: Settings,
    href: "/admin/features",
    color: "text-indigo-500",
  },
  {
    label: "Database Settings",
    icon: Database,
    href: "/admin/database",
    color: "text-blue-700",
  },
  {
    label: "Backend Settings",
    icon: Server,
    href: "/admin/backend-settings",
    color: "text-purple-700",
  },
  {
    label: "Map Settings",
    icon: Map,
    href: "/admin/map-settings",
    color: "text-yellow-700",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/admin/settings",
    color: "text-gray-700",
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-slate-900 text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/admin" className="flex items-center pl-3 mb-14">
          <div className="relative w-8 h-8 mr-4 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">RR</span>
          </div>
          <h1 className="text-2xl font-bold">RoadRescue</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href ? "text-white bg-white/10" : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2 border-t border-slate-700">
        <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-white/10">
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  )
}

export function MobileAdminSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-slate-900">
        <AdminSidebar />
      </SheetContent>
    </Sheet>
  )
}
