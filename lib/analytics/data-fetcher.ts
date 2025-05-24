// This is a mock implementation of the data fetcher
// In a real application, this would make API calls to your backend

type TimeRange = "24h" | "7d" | "30d" | "90d" | "12m"

export async function fetchAnalyticsData(timeRange: TimeRange) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Return mock data based on the time range
  return {
    timeRange,
    summary: {
      totalUsers: 2853,
      serviceRequests: 573,
      revenue: 45231.89,
      satisfaction: 4.8,
    },
    charts: {
      serviceRequests: {
        // Data would vary based on time range in a real implementation
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        data: [65, 59, 80, 81, 56, 55, 73],
      },
      serviceTypes: {
        labels: ["Towing", "Battery", "Flat Tire", "Lockout", "Fuel"],
        data: [30, 20, 25, 15, 10],
      },
      revenue: {
        labels: ["Towing", "Battery", "Flat Tire", "Lockout", "Fuel"],
        data: [12000, 8000, 6000, 5000, 4000],
      },
    },
    recentActivity: [
      {
        id: "1",
        type: "Towing",
        user: "John Doe",
        date: "2023-04-15",
        status: "Completed",
        amount: "$120.00",
      },
      {
        id: "2",
        type: "Battery Jump",
        user: "Jane Smith",
        date: "2023-04-14",
        status: "Completed",
        amount: "$45.00",
      },
      {
        id: "3",
        type: "Flat Tire",
        user: "Mike Johnson",
        date: "2023-04-14",
        status: "In Progress",
        amount: "$65.00",
      },
      {
        id: "4",
        type: "Lockout",
        user: "Sarah Williams",
        date: "2023-04-13",
        status: "Completed",
        amount: "$75.00",
      },
      {
        id: "5",
        type: "Fuel Delivery",
        user: "Robert Brown",
        date: "2023-04-12",
        status: "Completed",
        amount: "$55.00",
      },
    ],
  }
}
