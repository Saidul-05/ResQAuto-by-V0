import { type NextRequest, NextResponse } from "next/server"
import type { ServiceRequest } from "@/types/service"
import type { DetailedServiceRequest } from "@/types/detailed-service"

// In a real application, this would be a database
const serviceRequests: (ServiceRequest | DetailedServiceRequest)[] = [
  {
    id: "1",
    userId: "1",
    serviceType: "flat-tire",
    status: "in-progress",
    location: { lat: 40.7128, lng: -74.006 },
    description: "Flat tire on the front left wheel",
    vehicleInfo: {
      make: "Toyota",
      model: "Camry",
      year: 2018,
      color: "Silver",
      licensePlate: "ABC123",
    },
    technicianId: "2",
    technicianLocation: { lat: 40.72, lng: -74.01 },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

export async function GET(request: NextRequest) {
  // Get query parameters
  const searchParams = request.nextUrl.searchParams
  const userId = searchParams.get("userId")
  const status = searchParams.get("status")

  // Filter services based on query parameters
  let filteredServices = [...serviceRequests]

  if (userId) {
    filteredServices = filteredServices.filter((service) => service.userId === userId)
  }

  if (status) {
    filteredServices = filteredServices.filter((service) => service.status === status)
  }

  return NextResponse.json(filteredServices)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.userId || !body.serviceType || !body.location) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if this is a detailed service request
    const isDetailedRequest = body.contactInfo && body.additionalInfo

    if (isDetailedRequest) {
      // Create new detailed service request
      const newDetailedService: DetailedServiceRequest = {
        id: `${serviceRequests.length + 1}`,
        userId: body.userId,
        serviceType: body.serviceType,
        status: "pending",
        location: body.location,
        description: body.description || "",
        urgency: body.urgency || "standard",
        scheduledDate: body.scheduledDate,
        scheduledTime: body.scheduledTime,
        vehicleInfo: body.vehicleInfo || {
          make: "",
          model: "",
          year: new Date().getFullYear(),
          color: "",
          licensePlate: "",
        },
        contactInfo: body.contactInfo,
        additionalInfo: body.additionalInfo,
        technicianId: null,
        technicianLocation: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Add to "database"
      serviceRequests.push(newDetailedService)
      return NextResponse.json(newDetailedService, { status: 201 })
    } else {
      // Create new basic service request
      const newService: ServiceRequest = {
        id: `${serviceRequests.length + 1}`,
        userId: body.userId,
        serviceType: body.serviceType,
        status: "pending",
        location: body.location,
        description: body.description || "",
        vehicleInfo: body.vehicleInfo || null,
        technicianId: null,
        technicianLocation: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      // Add to "database"
      serviceRequests.push(newService)
      return NextResponse.json(newService, { status: 201 })
    }
  } catch (error) {
    console.error("Error creating service request:", error)
    return NextResponse.json({ error: "Failed to create service request" }, { status: 500 })
  }
}
