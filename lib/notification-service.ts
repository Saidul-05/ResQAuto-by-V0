"use client"

// Client-side notification service without sensitive keys
export class NotificationService {
  private static instance: NotificationService
  private isInitialized = false

  private constructor() {}

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService()
    }
    return NotificationService.instance
  }

  async initialize(userId: string): Promise<boolean> {
    if (this.isInitialized) return true

    try {
      // Check if browser supports notifications
      if (!("Notification" in window)) {
        console.warn("This browser does not support notifications")
        return false
      }

      // Request permission
      const permission = await Notification.requestPermission()

      if (permission !== "granted") {
        console.warn("Notification permission denied")
        return false
      }

      // Register service worker for push notifications
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.register("/sw.js")
        console.log("Service Worker registered:", registration)
      }

      this.isInitialized = true
      return true
    } catch (error) {
      console.error("Error initializing notifications:", error)
      return false
    }
  }

  async sendLocalNotification(title: string, body: string, options?: NotificationOptions): Promise<void> {
    if (Notification.permission === "granted") {
      new Notification(title, {
        body,
        icon: "/icons/icon-192x192.png",
        ...options,
      })
    }
  }

  async requestServerNotification(
    userId: string,
    title: string,
    body: string,
    data?: Record<string, string>,
  ): Promise<boolean> {
    try {
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
      console.error("Error requesting server notification:", error)
      return false
    }
  }
}
