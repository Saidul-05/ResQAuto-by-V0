import type { ServiceType, ServiceStatus, VehicleInfo } from "./service"

export interface ContactInfo {
  name: string
  phone: string
  email?: string
}

export interface AdditionalServiceInfo {
  passengers: number
  pets: boolean
  specialNeeds?: string
  membershipNumber?: string
}

export interface DetailedServiceRequest {
  id: string
  userId: string
  serviceType: ServiceType
  status: ServiceStatus
  location: { lat: number; lng: number }
  description: string
  urgency: "critical" | "urgent" | "standard" | "scheduled"
  scheduledDate?: string
  scheduledTime?: string
  vehicleInfo: VehicleInfo
  contactInfo: ContactInfo
  additionalInfo: AdditionalServiceInfo
  technicianId: string | null
  technicianLocation: { lat: number; lng: number } | null
  createdAt: string
  updatedAt: string
}
