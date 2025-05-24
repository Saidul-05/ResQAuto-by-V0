import { db } from "./config"
import { doc, onSnapshot, collection, query, where, orderBy, limit, type DocumentData } from "firebase/firestore"

type SnapshotCallback<T> = (data: T | null) => void
type ErrorCallback = (error: Error) => void
type Unsubscribe = () => void

// Listen to a single document in real-time
export function listenToDocument<T = DocumentData>(
  collectionName: string,
  documentId: string,
  callback: SnapshotCallback<T>,
  onError?: ErrorCallback,
): Unsubscribe {
  const docRef = doc(db, collectionName, documentId)

  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        callback(snapshot.data() as T)
      } else {
        callback(null)
      }
    },
    (error) => {
      console.error(`Error listening to document ${collectionName}/${documentId}:`, error)
      if (onError) onError(error)
    },
  )
}

// Listen to a collection with optional query parameters
export function listenToCollection<T = DocumentData>(
  collectionName: string,
  callback: (data: T[]) => void,
  options?: {
    whereField?: string
    whereOperator?: "==" | "!=" | ">" | ">=" | "<" | "<=" | "array-contains" | "in" | "array-contains-any" | "not-in"
    whereValue?: any
    orderByField?: string
    orderDirection?: "asc" | "desc"
    limitCount?: number
  },
  onError?: ErrorCallback,
): Unsubscribe {
  const collectionRef = collection(db, collectionName)

  // Build query based on options
  let queryRef = query(collectionRef)

  if (options?.whereField && options?.whereOperator && options?.whereValue !== undefined) {
    queryRef = query(queryRef, where(options.whereField, options.whereOperator, options.whereValue))
  }

  if (options?.orderByField) {
    queryRef = query(queryRef, orderBy(options.orderByField, options.orderDirection || "asc"))
  }

  if (options?.limitCount) {
    queryRef = query(queryRef, limit(options.limitCount))
  }

  return onSnapshot(
    queryRef,
    (snapshot) => {
      const data: T[] = []
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as T)
      })
      callback(data)
    },
    (error) => {
      console.error(`Error listening to collection ${collectionName}:`, error)
      if (onError) onError(error)
    },
  )
}

// Listen to a service request with related data (mechanic, customer, etc.)
export function listenToServiceWithRelations(
  serviceId: string,
  callback: (data: any) => void,
  onError?: ErrorCallback,
): Unsubscribe {
  return listenToDocument(
    "services",
    serviceId,
    async (serviceData) => {
      if (!serviceData) {
        callback(null)
        return
      }

      try {
        // Get related data
        const result: any = { ...serviceData, id: serviceId }

        // Add userId data if available
        if (serviceData.userId) {
          const userSnapshot = await doc(db, "users", serviceData.userId).get()
          if (userSnapshot.exists()) {
            result.user = userSnapshot.data()
          }
        }

        // Add technicianId data if available
        if (serviceData.technicianId) {
          const techSnapshot = await doc(db, "mechanics", serviceData.technicianId).get()
          if (techSnapshot.exists()) {
            result.technician = techSnapshot.data()
          }
        }

        callback(result)
      } catch (error) {
        console.error("Error fetching related data:", error)
        callback(serviceData) // Fallback to just the service data
      }
    },
    onError,
  )
}
