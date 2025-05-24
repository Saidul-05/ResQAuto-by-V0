export type ServiceType = "flat-tire" | "battery-jump" | "towing" | "fuel-delivery" | "lockout" | "other"

export type ServiceStatus = "pending" | "accepted" | "in-progress" | "completed" | "cancelled"

export interface VehicleInfo {
  make: string
  model: string
  year: number
  color: string
  licensePlate: string
}

export interface ServiceRequest {
  id: string
  userId: string
  serviceType: ServiceType
  status: ServiceStatus
  location: { lat: number; lng: number }
  description: string
  vehicleInfo: VehicleInfo | null
  technicianId: string | null
  technicianLocation: { lat: number; lng: number } | null
  createdAt: string
  updatedAt: string
}
