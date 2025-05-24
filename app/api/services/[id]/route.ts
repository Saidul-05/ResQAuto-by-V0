import { type NextRequest, NextResponse } from "next/server"
import type { ServiceRequest } from "@/types/service"

// In a real application, this would be a database
const serviceRequests: ServiceRequest[] = [
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

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  // Find service by ID
  const service = serviceRequests.find((s) => s.id === id)

  if (!service) {
    return NextResponse.json({ error: "Service request not found" }, { status: 404 })
  }

  return NextResponse.json(service)
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Find service by ID
    const serviceIndex = serviceRequests.findIndex((s) => s.id === id)

    if (serviceIndex === -1) {
      return NextResponse.json({ error: "Service request not found" }, { status: 404 })
    }

    // Update service request
    const updatedService = {
      ...serviceRequests[serviceIndex],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    // Save to "database"
    serviceRequests[serviceIndex] = updatedService

    return NextResponse.json(updatedService)
  } catch (error) {
    console.error("Error updating service request:", error)
    return NextResponse.json({ error: "Failed to update service request" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id

  // Find service by ID
  const serviceIndex = serviceRequests.findIndex((s) => s.id === id)

  if (serviceIndex === -1) {
    return NextResponse.json({ error: "Service request not found" }, { status: 404 })
  }

  // Remove from "database"
  serviceRequests.splice(serviceIndex, 1)

  return NextResponse.json({ success: true })
}
