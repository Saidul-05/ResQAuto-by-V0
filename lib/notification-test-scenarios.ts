export interface TestScenario {
  id: string
  name: string
  description: string
  notifications: {
    title: string
    body: string
    data?: Record<string, string>
    delay?: number // milliseconds
  }[]
}

export const testScenarios: TestScenario[] = [
  {
    id: "service-request-flow",
    name: "Service Request Flow",
    description: "Complete flow from request to completion",
    notifications: [
      {
        title: "Service Request Received",
        body: "Your roadside assistance request has been received and is being processed.",
        data: { type: "service_request", status: "received" },
      },
      {
        title: "Technician Assigned",
        body: "John Smith has been assigned to your request. ETA: 15 minutes.",
        data: { type: "service_request", status: "assigned", technician: "John Smith" },
        delay: 3000,
      },
      {
        title: "Technician En Route",
        body: "Your technician is on the way. You can track their location in real-time.",
        data: { type: "service_request", status: "en_route" },
        delay: 6000,
      },
      {
        title: "Technician Nearby",
        body: "Your technician is 2 minutes away. Please be ready.",
        data: { type: "service_request", status: "nearby" },
        delay: 9000,
      },
      {
        title: "Service Completed",
        body: "Your roadside assistance service has been completed. Thank you!",
        data: { type: "service_request", status: "completed" },
        delay: 12000,
      },
    ],
  },
  {
    id: "emergency-scenario",
    name: "Emergency Scenario",
    description: "Emergency assistance notifications",
    notifications: [
      {
        title: "🚨 Emergency Alert",
        body: "Emergency assistance has been requested. Help is on the way.",
        data: { type: "emergency", priority: "high" },
      },
      {
        title: "Emergency Response Dispatched",
        body: "Emergency services have been notified and are responding to your location.",
        data: { type: "emergency", status: "dispatched" },
        delay: 2000,
      },
      {
        title: "Emergency Contact Notified",
        body: "Your emergency contacts have been automatically notified of your situation.",
        data: { type: "emergency", status: "contacts_notified" },
        delay: 4000,
      },
    ],
  },
  {
    id: "membership-updates",
    name: "Membership Updates",
    description: "Membership and billing notifications",
    notifications: [
      {
        title: "Membership Renewal Reminder",
        body: "Your premium membership expires in 7 days. Renew now to continue enjoying benefits.",
        data: { type: "membership", action: "renewal_reminder" },
      },
      {
        title: "Payment Successful",
        body: "Your membership has been renewed successfully. Thank you for your continued trust.",
        data: { type: "membership", action: "payment_success" },
        delay: 5000,
      },
      {
        title: "New Benefits Available",
        body: "Check out the new benefits added to your premium membership!",
        data: { type: "membership", action: "new_benefits" },
        delay: 8000,
      },
    ],
  },
  {
    id: "promotional",
    name: "Promotional Campaign",
    description: "Marketing and promotional notifications",
    notifications: [
      {
        title: "🎉 Special Offer",
        body: "Get 20% off your next service request. Limited time offer!",
        data: { type: "promotion", campaign: "winter_special" },
      },
      {
        title: "Refer a Friend",
        body: "Refer friends and earn credits for future services. Start sharing now!",
        data: { type: "promotion", campaign: "referral" },
        delay: 10000,
      },
    ],
  },
]

export async function runTestScenario(
  scenarioId: string,
  userId: string,
  onNotificationSent?: (notification: any) => void,
): Promise<void> {
  const scenario = testScenarios.find((s) => s.id === scenarioId)
  if (!scenario) {
    throw new Error(`Test scenario ${scenarioId} not found`)
  }

  for (const notification of scenario.notifications) {
    if (notification.delay) {
      await new Promise((resolve) => setTimeout(resolve, notification.delay))
    }

    try {
      const response = await fetch("/api/send-notification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          title: notification.title,
          body: notification.body,
          data: notification.data,
        }),
      })

      const result = await response.json()
      onNotificationSent?.(result)
    } catch (error) {
      console.error("Failed to send notification:", error)
    }
  }
}
