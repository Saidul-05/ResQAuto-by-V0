"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, AlertTriangle, Phone } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function SOSButton() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emergencyType, setEmergencyType] = useState<string>("accident")
  const [details, setDetails] = useState<string>("")
  const { toast } = useToast()

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsDialogOpen(false)

    toast({
      title: "Emergency alert sent",
      description: "Help is on the way. Stay where you are.",
      variant: "destructive",
    })

    // Show confirmation alert
    setIsAlertOpen(true)
  }

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="lg" className="w-full py-6 text-lg font-bold animate-pulse">
            <AlertTriangle className="mr-2 h-6 w-6" />
            SOS Emergency
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Emergency Assistance</DialogTitle>
            <DialogDescription>
              Please provide details about your emergency situation. Our team will be notified immediately.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <RadioGroup value={emergencyType} onValueChange={setEmergencyType} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="accident" id="accident" />
                <Label htmlFor="accident">Car Accident</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medical" id="medical" />
                <Label htmlFor="medical">Medical Emergency</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="safety" id="safety" />
                <Label htmlFor="safety">Safety Concern</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other" />
                <Label htmlFor="other">Other Emergency</Label>
              </div>
            </RadioGroup>

            <div className="space-y-2">
              <Label htmlFor="details">Additional Details</Label>
              <Textarea
                id="details"
                placeholder="Please describe your emergency situation..."
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="sm:w-auto w-full">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleSubmit} disabled={isSubmitting} className="sm:w-auto w-full">
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending Alert...
                </>
              ) : (
                "Send Emergency Alert"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Emergency Services Notified</AlertDialogTitle>
            <AlertDialogDescription>
              Your emergency alert has been sent. Help is on the way. Please stay where you are if it's safe to do so.
              <div className="mt-4 p-4 bg-muted rounded-md">
                <p className="font-medium">Emergency Contact:</p>
                <p className="flex items-center mt-2">
                  <Phone className="mr-2 h-4 w-4" />
                  <a href="tel:911" className="text-primary underline">
                    911
                  </a>{" "}
                  (Emergency Services)
                </p>
                <p className="flex items-center mt-2">
                  <Phone className="mr-2 h-4 w-4" />
                  <a href="tel:+18007623404" className="text-primary underline">
                    1-800-ROADHELP
                  </a>{" "}
                  (RoadRescue Support)
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>Acknowledge</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
