"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Clock, Filter, MapPin, Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

// Sample bookings data
const bookings = [
  {
    id: "b1",
    service: "Flat Tire Change",
    date: "2023-08-15T14:30:00",
    location: "1234 Main St, Austin, TX",
    status: "Scheduled",
    technician: {
      name: "John Smith",
      rating: 4.8,
      image: "/placeholder.svg?height=40&width=40",
    },
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: 2019,
      licensePlate: "ABC-1234",
    },
  },
  {
    id: "b2",
    service: "Battery Jump Start",
    date: "2023-08-10T09:15:00",
    location: "456 Park Ave, Austin, TX",
    status: "Completed",
    technician: {
      name: "Maria Garcia",
      rating: 4.9,
      image: "/placeholder.svg?height=40&width=40",
    },
    vehicle: {
      make: "Honda",
      model: "CR-V",
      year: 2021,
      licensePlate: "XYZ-5678",
    },
  },
  {
    id: "b3",
    service: "Towing",
    date: "2023-08-05T11:45:00",
    location: "789 Oak Dr, Austin, TX",
    status: "Canceled",
    technician: null,
    vehicle: {
      make: "Toyota",
      model: "RAV4",
      year: 2020,
      licensePlate: "DEF-9012",
    },
  },
  {
    id: "b4",
    service: "Lockout Assistance",
    date: "2023-07-28T16:20:00",
    location: "321 Maple Ave, Austin, TX",
    status: "Completed",
    technician: {
      name: "David Chen",
      rating: 4.7,
      image: "/placeholder.svg?height=40&width=40",
    },
    vehicle: {
      make: "Honda",
      model: "Accord",
      year: 2018,
      licensePlate: "GHI-3456",
    },
  },
]

export default function BookingsPage() {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [status, setStatus] = useState<string>("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter bookings based on search, date, and status
  const filteredBookings = bookings.filter((booking) => {
    // Search filter
    if (
      searchQuery &&
      !booking.service.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !booking.location.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false
    }

    // Date filter
    if (date && format(new Date(booking.date), "yyyy-MM-dd") !== format(date, "yyyy-MM-dd")) {
      return false
    }

    // Status filter
    if (status !== "all" && booking.status.toLowerCase() !== status.toLowerCase()) {
      return false
    }

    return true
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Bookings</h1>
        <p className="text-muted-foreground">View and manage your roadside assistance service bookings</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bookings..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>

          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="canceled">Canceled</SelectItem>
            </SelectContent>
          </Select>

          {(date || status !== "all" || searchQuery) && (
            <Button
              variant="ghost"
              onClick={() => {
                setDate(undefined)
                setStatus("all")
                setSearchQuery("")
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking) => (
            <Card key={booking.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex flex-col space-y-3 md:w-1/3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-lg">{booking.service}</h3>
                      <Badge
                        variant={
                          booking.status === "Completed"
                            ? "outline"
                            : booking.status === "Scheduled"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {booking.status}
                      </Badge>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm">{format(new Date(booking.date), "PPP")}</p>
                        <p className="text-sm text-muted-foreground">{format(new Date(booking.date), "p")}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <p className="text-sm">{booking.location}</p>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-3 md:w-1/3">
                    <h4 className="font-medium">Vehicle</h4>
                    <div className="flex items-start gap-2">
                      <div>
                        <p className="text-sm">
                          {booking.vehicle.year} {booking.vehicle.make} {booking.vehicle.model}
                        </p>
                        <p className="text-sm text-muted-foreground">{booking.vehicle.licensePlate}</p>
                      </div>
                    </div>

                    {booking.technician && (
                      <>
                        <h4 className="font-medium">Technician</h4>
                        <div className="flex items-center gap-2">
                          <Image
                            src={booking.technician.image || "/placeholder.svg"}
                            alt={booking.technician.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div>
                            <p className="text-sm">{booking.technician.name}</p>
                            <p className="text-sm text-muted-foreground">Rating: {booking.technician.rating}/5</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex flex-col space-y-3 md:w-1/3 md:items-end md:justify-between">
                    <div className="flex gap-2 md:self-end">
                      {booking.status === "Scheduled" && (
                        <>
                          <Button variant="outline" size="sm">
                            Reschedule
                          </Button>
                          <Button variant="destructive" size="sm">
                            Cancel
                          </Button>
                        </>
                      )}
                      {booking.status === "Completed" && (
                        <Button variant="outline" size="sm">
                          View Receipt
                        </Button>
                      )}
                    </div>

                    <Button asChild variant="outline" className="md:self-end">
                      <Link href={`/dashboard/bookings/${booking.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 flex flex-col items-center justify-center min-h-[200px]">
              <p className="text-muted-foreground mb-4">No bookings found matching your filters.</p>
              <Button asChild>
                <Link href="/services">Book a Service</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="flex justify-center">
        <Button asChild className="bg-primary hover:bg-primary/90">
          <Link href="/services">Book New Service</Link>
        </Button>
      </div>
    </div>
  )
}
