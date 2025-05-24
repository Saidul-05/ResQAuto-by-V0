"use server"

import { initializeSupabaseDatabase } from "@/lib/supabase/init-db"
import { db } from "@/lib/firebase/config"
import { collection, getDocs, query, limit } from "firebase/firestore"

export async function initializeDatabase(provider: "firebase" | "supabase") {
  try {
    if (provider === "supabase") {
      await initializeSupabaseDatabase()
      return { success: true, message: "Supabase database initialized successfully" }
    } else {
      // For Firebase, we just check if the connection works
      // Firestore collections are created automatically when documents are added
      const testQuery = query(collection(db, "users"), limit(1))
      await getDocs(testQuery)
      return { success: true, message: "Firebase connection verified successfully" }
    }
  } catch (error: any) {
    console.error(`Error initializing ${provider} database:`, error)
    return {
      success: false,
      message: `Failed to initialize ${provider} database`,
      error: error.message,
    }
  }
}
