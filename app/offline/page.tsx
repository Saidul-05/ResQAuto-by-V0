"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { WifiOff, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function OfflinePage() {
  return (
    <div className="container flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto bg-muted w-12 h-12 rounded-full flex items-center justify-center mb-4">
            <WifiOff className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-2xl">You're Offline</CardTitle>
          <CardDescription>
            It looks like you've lost your internet connection. Some features may be unavailable until you're back
            online.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Don't worry, you can still access some basic features while offline. We'll automatically reconnect when your
            internet is available again.
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" onClick={() => window.location.reload()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Try Again
          </Button>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
