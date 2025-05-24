import { Bell, TestTube } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: any // Consider a more specific type for icons
}

const navigation: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: null, // Replace with actual icon
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: null, // Replace with actual icon
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: null, // Replace with actual icon
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: null, // Replace with actual icon
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: null, // Replace with actual icon
  },
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
  {
    title: "Test Notifications",
    href: "/admin/test-notifications",
    icon: TestTube,
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
