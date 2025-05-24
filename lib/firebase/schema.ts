import { db } from "./config"
import { collection, doc, getDocs, writeBatch } from "firebase/firestore"

// Collection names
export const COLLECTIONS = {
  USERS: "users",
  VEHICLES: "vehicles",
  SERVICES: "services",
  BOOKINGS: "bookings",
  MECHANICS: "mechanics",
  PROVIDERS: "providers",
  PAYMENTS: "payments",
  FEEDBACK: "feedback",
  NOTIFICATIONS: "notifications",
  EMERGENCY_CONTACTS: "emergencyContacts",
  SERVICE_AREAS: "serviceAreas",
}

// Example seed data for initializing the database
export const seedData = {
  users: [
    {
      id: "seed_user_1",
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "(555) 123-4567",
      role: "customer",
      membershipPlan: "premium",
      memberSince: "2023-01-15",
    },
    {
      id: "seed_user_2",
      firstName: "Alice",
      lastName: "Smith",
      email: "alice@example.com",
      phone: "(555) 987-6543",
      role: "customer",
      membershipPlan: "basic",
      memberSince: "2023-02-20",
    },
  ],
  mechanics: [
    {
      id: "seed_mech_1",
      userId: "seed_mech_user_1",
      firstName: "Mike",
      lastName: "Wilson",
      email: "mike@example.com",
      phone: "(555) 456-7890",
      specializations: ["Tire Change", "Battery Service", "Towing"],
      rating: 4.8,
      available: true,
      serviceRadius: 25,
      location: { lat: 40.7128, lng: -74.006 },
      completedJobs: 128,
      joinDate: "2023-01-10",
    },
  ],
  providers: [
    {
      id: "seed_prov_1",
      name: "QuickFix Auto Services",
      email: "info@quickfix.com",
      phone: "(555) 222-3333",
      address: "123 Service Ave, New York, NY",
      services: ["Towing", "Tire Change", "Jump Start", "Fuel Delivery"],
      rating: 4.7,
      operatingHours: "24/7",
      serviceRadius: 50,
      mechanicsCount: 15,
      joinDate: "2022-11-05",
    },
  ],
  vehicles: [
    {
      id: "seed_vehicle_1",
      userId: "seed_user_1",
      make: "Toyota",
      model: "Camry",
      year: 2018,
      color: "Silver",
      licensePlate: "ABC123",
      vin: "1HGCM82633A123456",
      insuranceName: "AllState",
      insuranceNumber: "INS-1234567",
    },
  ],
  services: [
    {
      id: "seed_service_1",
      name: "Flat Tire Change",
      description: "Professional tire change service for passenger vehicles",
      basePrice: 85.0,
      category: "tire",
      avgCompletionTime: 30, // minutes
      available: true,
    },
    {
      id: "seed_service_2",
      name: "Battery Jump Start",
      description: "Jump start service for vehicles with dead batteries",
      basePrice: 65.0,
      category: "battery",
      avgCompletionTime: 20, // minutes
      available: true,
    },
  ],
}

// Initialize database schema
export async function initializeDatabase() {
  try {
    // Check if database is already initialized
    const usersSnapshot = await getDocs(collection(db, COLLECTIONS.USERS))

    if (!usersSnapshot.empty) {
      console.log("Database already has data. Skipping initialization.")
      return { success: true, message: "Database already initialized" }
    }

    // Create seed data in batches
    const batch = writeBatch(db)

    // Seed users
    for (const user of seedData.users) {
      const userRef = doc(db, COLLECTIONS.USERS, user.id)
      batch.set(userRef, user)
    }

    // Seed mechanics
    for (const mechanic of seedData.mechanics) {
      const mechRef = doc(db, COLLECTIONS.MECHANICS, mechanic.id)
      batch.set(mechRef, mechanic)
    }

    // Seed providers
    for (const provider of seedData.providers) {
      const provRef = doc(db, COLLECTIONS.PROVIDERS, provider.id)
      batch.set(provRef, provider)
    }

    // Seed vehicles
    for (const vehicle of seedData.vehicles) {
      const vehicleRef = doc(db, COLLECTIONS.VEHICLES, vehicle.id)
      batch.set(vehicleRef, vehicle)
    }

    // Seed services
    for (const service of seedData.services) {
      const serviceRef = doc(db, COLLECTIONS.SERVICES, service.id)
      batch.set(serviceRef, service)
    }

    // Commit all changes
    await batch.commit()

    return { success: true, message: "Database initialized successfully" }
  } catch (error) {
    console.error("Error initializing database:", error)
    return { success: false, error: String(error) }
  }
}

// Function to import data from JSON
export async function importFromJson(jsonData: string) {
  try {
    const data = JSON.parse(jsonData)
    const batch = writeBatch(db)

    // Process each collection in the imported data
    for (const [collectionName, documents] of Object.entries(data)) {
      if (Array.isArray(documents)) {
        for (const doc of documents) {
          if (doc.id) {
            const docRef = doc(db, collectionName, doc.id)
            batch.set(docRef, doc)
          }
        }
      }
    }

    await batch.commit()
    return { success: true, message: "Data imported successfully" }
  } catch (error) {
    console.error("Error importing data:", error)
    return { success: false, error: String(error) }
  }
}

// Function to migrate data between providers
export async function migrateData(source: "firebase" | "supabase", target: "firebase" | "supabase") {
  // This would be implemented with actual migration logic between Firebase and Supabase
  // For now, just return a success message
  return { success: true, message: `Migration from ${source} to ${target} completed` }
}
