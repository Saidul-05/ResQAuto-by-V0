"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  MoreHorizontal,
  Eye,
  Trash,
  Download,
  Filter,
  RefreshCw,
  Calendar,
  MapPin,
  User,
  Car,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Sample booking data
const bookings = [
  {
    id: "B-1001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    serviceType: "Flat Tire Replacement",
    status: "completed",
    location: "123 Main St, Anytown",
    assignedTo: "Mike Wilson",
    createdAt: "2023-05-10T14:30:00Z",
    scheduledFor: "2023-05-10T16:00:00Z",
    completedAt: "2023-05-10T16:45:00Z",
    amount: 85.0,
  },
  {
    id: "B-1002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    serviceType: "Battery Jump Start",
    status: "in-progress",
    location: "456 Oak Ave, Anytown",
    assignedTo: "Emily Davis",
    createdAt: "2023-05-12T09:15:00Z",
    scheduledFor: "2023-05-12T10:30:00Z",
    completedAt: null,
    amount: 65.0,
  },
  {
    id: "B-1003",
    customerName: "Robert Brown",
    customerEmail: "robert@example.com",
    serviceType: "Towing Service",
    status: "pending",
    location: "789 Pine St, Anytown",
    assignedTo: null,
    createdAt: "2023-05-12T11:20:00Z",
    scheduledFor: "2023-05-12T13:00:00Z",
    completedAt: null,
    amount: 120.0,
  },
  {
    id: "B-1004",
    customerName: "Sarah Williams",
    customerEmail: "sarah@example.com",
    serviceType: "Fuel Delivery",
    status: "cancelled",
    location: "321 Elm St, Anytown",
    assignedTo: null,
    createdAt: "2023-05-11T16:45:00Z",
    scheduledFor: "2023-05-11T18:00:00Z",
    completedAt: null,
    amount: 75.0,
  },
  {
    id: "B-1005",
    customerName: "David Johnson",
    customerEmail: "david@example.com",
    serviceType: "Lockout Assistance",
    status: "scheduled",
    location: "654 Maple Dr, Anytown",
    assignedTo: "Mike Wilson",
    createdAt: "2023-05-12T13:10:00Z",
    scheduledFor: "2023-05-13T10:00:00Z",
    completedAt: null,
    amount: 80.0,
  },
]

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  // Filter bookings based on search query and active tab
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.serviceType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.location.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "pending") return matchesSearch && booking.status === "pending"
    if (activeTab === "in-progress") return matchesSearch && booking.status === "in-progress"
    if (activeTab === "scheduled") return matchesSearch && booking.status === "scheduled"
    if (activeTab === "completed") return matchesSearch && booking.status === "completed"
    if (activeTab === "cancelled") return matchesSearch && booking.status === "cancelled"

    return matchesSearch
  })

  const handleDeleteBooking = (bookingId: string) => {
    // In a real app, this would delete the booking from the database
    toast({
      title: "Booking Deleted",
      description: `Booking ${bookingId} has been deleted.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "in-progress":
        return <Badge className="bg-blue-500">In Progress</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "scheduled":
        return <Badge className="bg-purple-500">Scheduled</Badge>
      case "cancelled":
        return (
          <Badge variant="outline" className="text-gray-500 border-gray-300">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">Manage service bookings and appointments</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search bookings..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Bookings</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
          <TabsTrigger value="in-progress">In Progress</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Scheduled For</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No bookings found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredBookings.map((booking) => (
                      <TableRow key={booking.id}>
                        <TableCell className="font-medium">{booking.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4 text-muted-foreground" />
                              {booking.customerName}
                            </div>
                            <span className="text-xs text-muted-foreground">{booking.customerEmail}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
                            {booking.serviceType}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(booking.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                            <span className="truncate max-w-[150px]">{booking.location}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            {new Date(booking.scheduledFor).toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          {booking.assignedTo || <span className="text-muted-foreground">Unassigned</span>}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem>Assign Mechanic</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteBooking(booking.id)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
