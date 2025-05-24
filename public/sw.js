// Service Worker for RoadRescue PWA

const CACHE_NAME = "roadrescue-v1"
const PRECACHE_ASSETS = [
  "/",
  "/offline",
  "/manifest.json",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/maskable_icon.png",
]

// Install event - precache assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache")
        return cache.addAll(PRECACHE_ASSETS)
      })
      .catch((err) => {
        console.error("Precaching failed:", err)
      }),
  )
  self.skipWaiting()
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME]
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName)
          }
        }),
      )
    }),
  )
  self.clients.claim()
})

// Advanced caching strategies
const networkFirst = async (request) => {
  try {
    // Try network first
    const networkResponse = await fetch(request)

    // If successful, clone and cache the response
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_NAME)
      cache.put(request, networkResponse.clone())
    }

    return networkResponse
  } catch (error) {
    // If network fails, try cache
    const cachedResponse = await caches.match(request)

    if (cachedResponse) {
      return cachedResponse
    }

    // If no cache for this specific request, try the offline page
    if (request.mode === "navigate") {
      return caches.match("/offline")
    }

    throw error
  }
}

const cacheFirst = async (request) => {
  // Try cache first
  const cachedResponse = await caches.match(request)

  if (cachedResponse) {
    return cachedResponse
  }

  // If not in cache, fetch from network
  try {
    const networkResponse = await fetch(request)

    // Cache the response for future
    const cache = await caches.open(CACHE_NAME)
    cache.put(request, networkResponse.clone())

    return networkResponse
  } catch (error) {
    // If both cache and network fail and it's a navigation request, show offline page
    if (request.mode === "navigate") {
      return caches.match("/offline")
    }

    throw error
  }
}

const staleWhileRevalidate = async (request) => {
  // First, try to get from cache
  const cachedResponse = await caches.match(request)

  // Fetch from network to update cache
  const fetchPromise = fetch(request)
    .then((networkResponse) => {
      const cache = caches.open(CACHE_NAME)
      cache.then((cache) => cache.put(request, networkResponse.clone()))
      return networkResponse
    })
    .catch((error) => {
      console.error("SWR fetch failed:", error)
      // If it's a navigation request and network fails, return offline page
      if (request.mode === "navigate") {
        return caches.match("/offline")
      }
    })

  // Return cached response immediately, or wait for network
  return cachedResponse || fetchPromise
}

// Fetch event - apply caching strategies based on request type
self.addEventListener("fetch", (event) => {
  // Skip cross-origin requests
  if (!event.request.url.startsWith(self.location.origin)) {
    return
  }

  // Skip chrome-extension requests
  if (event.request.url.startsWith("chrome-extension://")) {
    return
  }

  const url = new URL(event.request.url)

  // Apply different strategies based on request type
  if (event.request.mode === "navigate") {
    // For HTML pages, use network-first approach
    event.respondWith(networkFirst(event.request))
  } else if (url.pathname.startsWith("/api/")) {
    // For API requests, try network only, no caching
    event.respondWith(
      fetch(event.request).catch(() => {
        return new Response(JSON.stringify({ error: "You are offline" }), {
          headers: { "Content-Type": "application/json" },
          status: 503,
        })
      }),
    )
  } else if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico)$/)) {
    // For static assets, use cache-first approach
    event.respondWith(cacheFirst(event.request))
  } else {
    // For everything else, use stale-while-revalidate
    event.respondWith(staleWhileRevalidate(event.request))
  }
})

// Push notification event handler
self.addEventListener("push", (event) => {
  if (!event.data) {
    console.log("Push event but no data")
    return
  }

  try {
    const data = event.data.json()

    const options = {
      body: data.body || "New notification",
      icon: data.icon || "/icons/icon-192x192.png",
      badge: "/icons/badge-icon.png",
      data: data.data || {},
      actions: data.actions || [],
    }

    event.waitUntil(self.registration.showNotification(data.title || "RoadRescue", options))
  } catch (error) {
    console.error("Error handling push notification:", error)
  }
})

// Notification click event handler
self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  // This looks at the notification data and opens the appropriate URL
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientsArr) => {
      const url = event.notification.data.url || "/"

      // Check if there's already a window open to this URL
      const hadWindowToFocus = clientsArr.some((client) => {
        if (client.url === url && "focus" in client) {
          client.focus()
          return true
        }
        return false
      })

      // If not, open a new window
      if (!hadWindowToFocus && clients.openWindow) {
        return clients.openWindow(url)
      }
    }),
  )
})

// Background sync for offline form submissions
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-service-requests") {
    event.waitUntil(synchronizeServiceRequests())
  } else if (event.tag === "sync-feedback") {
    event.waitUntil(synchronizeFeedback())
  }
})

// Function to synchronize pending service requests
async function synchronizeServiceRequests() {
  try {
    // Get all pending requests from IndexedDB
    const db = await openDB("offlineRequests", 1)
    const pendingRequests = await db.getAll("serviceRequests")

    for (const request of pendingRequests) {
      try {
        // Try to send the request to the server
        const response = await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(request.data),
        })

        if (response.ok) {
          // If successful, delete from IndexedDB
          await db.delete("serviceRequests", request.id)
        }
      } catch (error) {
        console.error("Failed to sync service request:", error)
      }
    }
  } catch (error) {
    console.error("Error in background sync:", error)
  }
}

// Function to synchronize pending feedback
async function synchronizeFeedback() {
  // Similar implementation as synchronizeServiceRequests
  console.log("Syncing feedback data...")
}

// Helper function for opening IndexedDB
function openDB(name, version) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(name, version)

    request.onupgradeneeded = (event) => {
      const db = event.target.result
      if (!db.objectStoreNames.contains("serviceRequests")) {
        db.createObjectStore("serviceRequests", { keyPath: "id" })
      }
      if (!db.objectStoreNames.contains("feedback")) {
        db.createObjectStore("feedback", { keyPath: "id" })
      }
    }

    request.onsuccess = (event) => resolve(event.target.result)
    request.onerror = (event) => reject(event.target.error)
  })
}

// Periodic background sync (when supported)
self.addEventListener("periodicsync", (event) => {
  if (event.tag === "update-content") {
    event.waitUntil(updateContent())
  }
})

// Function to update content in the background
async function updateContent() {
  try {
    // Fetch and cache latest service prices
    const response = await fetch("/api/services/prices")
    if (response.ok) {
      const cache = await caches.open(CACHE_NAME)
      await cache.put("/api/services/prices", response)
    }
  } catch (error) {
    console.error("Error updating content in background:", error)
  }
}
