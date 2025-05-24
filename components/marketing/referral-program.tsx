"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Share2, Copy, Check, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function ReferralProgram() {
  const [isCopied, setIsCopied] = useState(false)
  const [isSharing, setIsSharing] = useState(false)
  const [email, setEmail] = useState("")
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()

  const referralCode = "ROADHELP25"
  const referralLink = `https://roadrescue.com/refer?code=${referralCode}`

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setIsCopied(true)

    toast({
      title: "Copied to clipboard!",
      description: "Your referral link has been copied.",
    })

    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }

  const handleShare = async () => {
    setIsSharing(true)

    try {
      if (navigator.share) {
        await navigator.share({
          title: "RoadRescue Referral",
          text: "Join RoadRescue and get 25% off your first month! Use my referral code.",
          url: referralLink,
        })

        toast({
          title: "Thanks for sharing!",
          description: "Your friends will thank you for the discount.",
        })
      } else {
        // Fallback for browsers that don't support the Web Share API
        handleCopy()
      }
    } catch (error) {
      console.error("Error sharing:", error)

      toast({
        title: "Sharing failed",
        description: "Please try copying the link instead.",
        variant: "destructive",
      })
    } finally {
      setIsSharing(false)
    }
  }

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSending(false)
    setEmail("")

    toast({
      title: "Invitation sent!",
      description: "Your friend has been invited to RoadRescue.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Refer a Friend</CardTitle>
        <CardDescription>Refer friends to RoadRescue and you both get 25% off your next month!</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="link">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="link">Share Link</TabsTrigger>
            <TabsTrigger value="email">Email Invite</TabsTrigger>
          </TabsList>

          <TabsContent value="link" className="mt-4 space-y-4">
            <div className="flex items-center gap-2">
              <Input value={referralLink} readOnly className="font-mono text-sm" />
              <Button variant="outline" size="icon" onClick={handleCopy} disabled={isCopied}>
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy link</span>
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1" onClick={handleShare} disabled={isSharing}>
                {isSharing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sharing...
                  </>
                ) : (
                  <>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Link
                  </>
                )}
              </Button>
              <Button variant="outline" className="flex-1" onClick={handleCopy} disabled={isCopied}>
                {isCopied ? (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </>
                )}
              </Button>
            </div>

            <div className="text-center">
              <p className="text-sm font-medium">Your referral code</p>
              <p className="text-lg font-bold tracking-wider">{referralCode}</p>
            </div>
          </TabsContent>

          <TabsContent value="email" className="mt-4">
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Friend's email address"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isSending}>
                {isSending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  "Send Invitation"
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">Terms apply. Discount valid for new users only.</CardFooter>
    </Card>
  )
}
