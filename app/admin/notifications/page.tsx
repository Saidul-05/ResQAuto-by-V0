import { QuickNotificationTester } from "@/components/notification/quick-notification-tester"

const NotificationsPage = () => {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Notifications Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Add this card to the grid */}
        <QuickNotificationTester />
      </div>
    </div>
  )
}

export default NotificationsPage
