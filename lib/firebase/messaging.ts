import { getMessaging, getToken, onMessage } from "firebase/messaging"
import { app } from "./config"
import { doc, setDoc, updateDoc, getDoc, arrayUnion } from "firebase/firestore"
import { db } from "./config"
import { safeLocalStorage } from "@/lib/safe-local-storage"

// Check if browser supports notifications
const isBrowserSupported = () => {
  return "Notification" in window && "serviceWorker" in navigator && "PushManager" in window
}

// Initialize Firebase Cloud Messaging
let messaging: any = null
try {
  messaging = getMessaging(app)
} catch (error) {
  console.error("Error initializing Firebase Messaging:", error)
}

// Request permission and get token
export async function requestNotificationPermission(userId: string): Promise<boolean> {
  if (!isBrowserSupported() || !messaging) {
    console.warn("Browser doesn't support notifications or messaging is not initialized")
    return false
  }

  try {
    // Request notification permission
    const permission = await Notification.requestPermission()

    if (permission !== "granted") {
      console.warn("Notification permission denied")
      return false
    }

    // Get FCM token without VAPID key (will use default)
    // Note: For production, you should configure this through Firebase Console
    const token = await getToken(messaging)

    if (token) {
      // Save token to localStorage
      safeLocalStorage?.setItem("fcmToken", token)

      // Save token to Firestore
      await saveTokenToFirestore(userId, token)

      // Set up message handler
      setupMessageHandler()

      // Send token to server for validation
      await fetch("/api/fcm-token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationToken: token }),
      })

      return true
    } else {
      console.warn("Failed to get FCM token")
      return false
    }
  } catch (error) {
    console.error("Error requesting notification permission:", error)
    return false
  }
}

// Save FCM token to Firestore for the user
async function saveTokenToFirestore(userId: string, token: string): Promise<void> {
  try {
    const userTokensRef = doc(db, "userTokens", userId)
    const userTokensSnapshot = await getDoc(userTokensRef)

    if (userTokensSnapshot.exists()) {
      // Add token to array if it doesn't already exist
      await updateDoc(userTokensRef, {
        tokens: arrayUnion(token),
        lastUpdated: new Date(),
      })
    } else {
      // Create new document
      await setDoc(userTokensRef, {
        userId,
        tokens: [token],
        createdAt: new Date(),
        lastUpdated: new Date(),
      })
    }
  } catch (error) {
    console.error("Error saving token to Firestore:", error)
  }
}

// Set up foreground message handler
function setupMessageHandler() {
  if (!messaging) return

  onMessage(messaging, (payload) => {
    console.log("Received foreground message:", payload)

    // Show custom notification
    if (payload.notification) {
      const { title, body } = payload.notification

      // Show browser notification
      if (Notification.permission === "granted" && title) {
        const notification = new Notification(title as string, {
          body: body as string,
          icon: "/icons/icon-192x192.png",
        })

        // Handle notification click
        notification.onclick = () => {
          window.focus()
          notification.close()

          // Handle any custom data/actions
          if (payload.data?.url) {
            window.location.href = payload.data.url
          }
        }
      }
    }
  })
}

// Send notification to specific user (server-side only)
export async function sendNotificationToUser(
  userId: string,
  title: string,
  body: string,
  data?: Record<string, string>,
): Promise<boolean> {
  try {
    // This should be called from a server action or API route
    const response = await fetch("/api/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId,
        title,
        body,
        data,
      }),
    })

    return response.ok
  } catch (error) {
    console.error("Error sending notification:", error)
    return false
  }
}
