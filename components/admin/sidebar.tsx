import {
  Bell,
  TestTube,
  LayoutDashboard,
  Car,
  FileText,
  Users,
  CreditCard,
  BarChart,
  Layers,
  ImageIcon,
  Shield,
  Settings,
  Database,
  Server,
  Map,
} from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: any // Consider a more specific type for icons
  color: string
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
    color: "text-sky-500",
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Car,
    color: "text-violet-500",
  },
  {
    title: "Bookings",
    href: "/admin/bookings",
    icon: FileText,
    color: "text-pink-700",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Users,
    color: "text-orange-700",
  },
  {
    title: "Payments",
    href: "/admin/payments",
    icon: CreditCard,
    color: "text-emerald-500",
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart,
    color: "text-green-700",
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
    color: "text-blue-500",
  },
  {
    title: "Test Notifications",
    href: "/admin/test-notifications",
    icon: TestTube,
    color: "text-purple-500",
  },
  {
    title: "Homepage Slider",
    href: "/admin/home-slider",
    icon: Layers,
    color: "text-blue-500",
  },
  {
    title: "Ads Management",
    href: "/admin/ads",
    icon: ImageIcon,
    color: "text-red-500",
  },
  {
    title: "HomeShield",
    href: "/admin/home-shield",
    icon: Shield,
    color: "text-amber-500",
  },
  {
    title: "Features",
    href: "/admin/features",
    icon: Settings,
    color: "text-indigo-500",
  },
  {
    title: "Database Settings",
    href: "/admin/database",
    icon: Database,
    color: "text-blue-700",
  },
  {
    title: "Backend Settings",
    href: "/admin/backend-settings",
    icon: Server,
    color: "text-purple-700",
  },
  {
    title: "Map Settings",
    href: "/admin/map-settings",
    icon: Map,
    color: "text-yellow-700",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    color: "text-gray-700",
  },
]

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 h-screen">
      <nav className="p-4">
        <ul>
          {navigation.map((item) => (
            <li key={item.title} className="mb-2">
              <a href={item.href} className="block p-2 rounded hover:bg-gray-200">
                {item.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
