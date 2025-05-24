// Simple analytics tracking library

// Define event types
export type EventType =
  | "page_view"
  | "button_click"
  | "form_submit"
  | "service_request"
  | "payment"
  | "notification"
  | "error"
  | "search"
  | "login"
  | "signup"
  | "logout"
  | "feature_usage"

interface EventData {
  [key: string]: any
}

// Track events in the application
export function trackEvent(eventType: EventType, eventData: EventData = {}) {
  try {
    // Add timestamp and event type
    const event = {
      event_type: eventType,
      timestamp: new Date().toISOString(),
      page_url: typeof window !== "undefined" ? window.location.href : "",
      ...eventData,
    }

    // Log event (in development)
    if (process.env.NODE_ENV === "development") {
      console.log("[Analytics]", event)
    }

    // In a real app, you would send this to your analytics provider
    // For now, we'll just store it locally
    storeEventLocally(event)

    // If Firebase Analytics is available, send there too
    sendToFirebaseAnalytics(eventType, eventData)

    return true
  } catch (error) {
    console.error("Error tracking event:", error)
    return false
  }
}

// Store events locally for testing/demo purposes
function storeEventLocally(event: any) {
  if (typeof window === "undefined") return

  try {
    // Get existing events from localStorage
    const eventsStr = localStorage.getItem("analytics_events")
    const events = eventsStr ? JSON.parse(eventsStr) : []

    // Add new event
    events.push(event)

    // Keep only the last 100 events to avoid localStorage limits
    const recentEvents = events.slice(-100)

    // Save back to localStorage
    localStorage.setItem("analytics_events", JSON.stringify(recentEvents))
  } catch (error) {
    console.error("Error storing event locally:", error)
  }
}

// Send events to Firebase Analytics if available
function sendToFirebaseAnalytics(eventType: EventType, eventData: EventData) {
  if (typeof window === "undefined") return

  // Check if Firebase Analytics is available
  if (window.firebase && window.firebase.analytics) {
    try {
      const analytics = window.firebase.analytics()
      analytics.logEvent(eventType, eventData)
    } catch (error) {
      console.error("Error sending to Firebase Analytics:", error)
    }
  }
}

// Page view tracking
export function trackPageView(pageTitle: string, additionalData: EventData = {}) {
  return trackEvent("page_view", {
    page_title: pageTitle,
    ...additionalData,
  })
}

// Button click tracking
export function trackButtonClick(buttonName: string, additionalData: EventData = {}) {
  return trackEvent("button_click", {
    button_name: buttonName,
    ...additionalData,
  })
}

// Form submission tracking
export function trackFormSubmit(formName: string, success: boolean, additionalData: EventData = {}) {
  return trackEvent("form_submit", {
    form_name: formName,
    success,
    ...additionalData,
  })
}

// Service request tracking
export function trackServiceRequest(serviceType: string, status: string, additionalData: EventData = {}) {
  return trackEvent("service_request", {
    service_type: serviceType,
    status,
    ...additionalData,
  })
}

// Payment tracking
export function trackPayment(amount: number, currency: string, method: string, additionalData: EventData = {}) {
  return trackEvent("payment", {
    amount,
    currency,
    method,
    ...additionalData,
  })
}

// Error tracking
export function trackError(errorCode: string, errorMessage: string, additionalData: EventData = {}) {
  return trackEvent("error", {
    error_code: errorCode,
    error_message: errorMessage,
    ...additionalData,
  })
}
