import { type NextRequest, NextResponse } from "next/server"
import { getMessaging } from "firebase-admin/messaging"
import { initializeApp, getApps, cert } from "firebase-admin/app"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"

// Initialize Firebase Admin SDK
if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

export async function POST(request: NextRequest) {
  try {
    const { userId, title, body, data } = await request.json()

    if (!userId || !title || !body) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Get user tokens from Firestore
    const userTokensRef = doc(db, "userTokens", userId)
    const userTokensSnap = await getDoc(userTokensRef)

    if (!userTokensSnap.exists() || !userTokensSnap.data().tokens?.length) {
      return NextResponse.json({ error: "No FCM tokens found for user" }, { status: 404 })
    }

    const tokens = userTokensSnap.data().tokens
    const messaging = getMessaging()

    // Send notification to all user tokens
    const message = {
      notification: {
        title,
        body,
      },
      data: data || {},
      tokens,
    }

    const response = await messaging.sendMulticast(message)

    return NextResponse.json({
      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,
    })
  } catch (error) {
    console.error("Error sending notification:", error)
    return NextResponse.json({ error: "Failed to send notification" }, { status: 500 })
  }
}
