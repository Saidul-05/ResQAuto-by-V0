"use client"

import { useState, useEffect } from "react"
import { Bell, BellRing, CheckCheck, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { NotificationService } from "@/lib/notification-service"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"
import { toast } from "@/components/ui/use-toast"
import { listenToCollection } from "@/lib/firebase/real-time"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { formatDistanceToNow } from "date-fns"

interface Notification {
  id: string
  userId: string
  title: string
  message: string
  read: boolean
  type: string
  createdAt: any // Firestore timestamp
  link?: string
}

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showPermissionDialog, setShowPermissionDialog] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission | "default">("default")
  const { user } = useAuth()

  // Check notification permission on mount
  useEffect(() => {
    if ("Notification" in window) {
      setPermissionStatus(Notification.permission)
    }
  }, [])

  // Listen to notifications for the current user
  useEffect(() => {
    if (!user?.id) return

    const unsubscribe = listenToCollection<Notification>(
      "notifications",
      (data) => {
        // Sort by date descending
        const sortedNotifications = data
          .filter((notification) => notification.userId === user.id)
          .sort((a, b) => {
            const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt)
            const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt)
            return dateB.getTime() - dateA.getTime()
          })

        setNotifications(sortedNotifications)
        setUnreadCount(sortedNotifications.filter((n) => !n.read).length)
      },
      {
        whereField: "userId",
        whereOperator: "==",
        whereValue: user.id,
        orderByField: "createdAt",
        orderDirection: "desc",
        limitCount: 20,
      },
    )

    return () => unsubscribe()
  }, [user?.id])

  const requestPermission = async () => {
    if (!user?.id) return

    const notificationService = NotificationService.getInstance()
    const granted = await notificationService.initialize(user.id)

    setPermissionStatus(granted ? "granted" : "denied")

    if (granted) {
      toast({
        title: "Notifications enabled",
        description: "You will now receive push notifications about your service requests.",
      })
    } else {
      toast({
        title: "Notifications disabled",
        description: "You won't receive push notifications. You can enable them in your browser settings.",
        variant: "destructive",
      })
    }

    setShowPermissionDialog(false)
  }

  const markAsRead = async (notification: Notification) => {
    try {
      // If it's already read, don't do anything
      if (notification.read) return

      // Update the notification in Firestore
      await updateDoc(doc(db, "notifications", notification.id), {
        read: true,
      })

      // If there's a link, navigate to it
      if (notification.link) {
        window.location.href = notification.link
      }
    } catch (error) {
      console.error("Error marking notification as read:", error)
    }
  }

  const markAllAsRead = async () => {
    try {
      // Get unread notifications
      const unread = notifications.filter((n) => !n.read)

      // Update each notification
      for (const notification of unread) {
        await updateDoc(doc(db, "notifications", notification.id), {
          read: true,
        })
      }

      toast({
        title: "Notifications marked as read",
        description: `${unread.length} notification${unread.length !== 1 ? "s" : ""} marked as read.`,
      })
    } catch (error) {
      console.error("Error marking all notifications as read:", error)
      toast({
        title: "Error",
        description: "Failed to mark notifications as read. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative p-2">
            {unreadCount > 0 ? (
              <>
                <BellRing className="h-5 w-5" />
                <Badge
                  className="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4 bg-destructive h-5 w-5 p-0 flex items-center justify-center text-[10px]"
                  variant="destructive"
                >
                  {unreadCount}
                </Badge>
              </>
            ) : (
              <Bell className="h-5 w-5" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px]">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-7 text-xs">
                <CheckCheck className="mr-1 h-3 w-3" />
                Mark all as read
              </Button>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="max-h-[300px] overflow-y-auto">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <DropdownMenuItem
                  key={notification.id}
                  className={`flex flex-col items-start py-2 px-4 ${notification.read ? "" : "bg-muted/50"}`}
                  onClick={() => markAsRead(notification)}
                >
                  <div className="w-full">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">{notification.title}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(
                          notification.createdAt?.toDate
                            ? notification.createdAt.toDate()
                            : new Date(notification.createdAt),
                        )}{" "}
                        ago
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                  </div>
                </DropdownMenuItem>
              ))
            ) : (
              <div className="py-4 px-2 text-center text-muted-foreground text-sm">No notifications yet</div>
            )}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setShowPermissionDialog(true)}
            className="justify-center text-center font-medium text-sm"
          >
            Manage Notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showPermissionDialog} onOpenChange={setShowPermissionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enable Push Notifications</DialogTitle>
            <DialogDescription>
              Get real-time updates about your service requests, driver location, and important alerts.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="p-2 bg-primary/10 rounded-full">
                <Bell className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Service Updates</h4>
                <p className="text-sm text-muted-foreground">
                  Get notified when your service request status changes or when a technician is assigned.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 rtl:space-x-reverse">
              <div className="p-2 bg-primary/10 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-medium">Location Tracking</h4>
                <p className="text-sm text-muted-foreground">
                  Receive alerts when your technician is nearby or if there are any delays.
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissionDialog(false)}>
              Later
            </Button>
            <Button onClick={requestPermission}>Enable Notifications</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
