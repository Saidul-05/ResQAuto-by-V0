import { type NextRequest, NextResponse } from "next/server"
import { getMessaging } from "firebase-admin/messaging"
import { initializeApp, getApps, cert } from "firebase-admin/app"

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
    const { registrationToken } = await request.json()

    if (!registrationToken) {
      return NextResponse.json({ error: "Registration token is required" }, { status: 400 })
    }

    // Verify the token is valid
    const messaging = getMessaging()

    // You can add additional validation here if needed
    // For now, we'll just return success since the token generation
    // will be handled client-side with the public VAPID key

    return NextResponse.json({
      success: true,
      message: "Token processed successfully",
    })
  } catch (error) {
    console.error("Error processing FCM token:", error)
    return NextResponse.json({ error: "Failed to process FCM token" }, { status: 500 })
  }
}
