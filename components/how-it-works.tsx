import { MapPin, PhoneCall, Truck } from "lucide-react"

export function HowItWorks() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
          <PhoneCall className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">1. Request Assistance</h3>
        <p className="text-muted-foreground">
          Call our emergency line or use our mobile app to request immediate assistance. Provide your location and
          details about your situation.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
          <MapPin className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">2. Track Your Technician</h3>
        <p className="text-muted-foreground">
          We'll dispatch the nearest technician to your location. Track their arrival in real-time through our app.
        </p>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center mb-4">
          <Truck className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold mb-2">3. Get Back on the Road</h3>
        <p className="text-muted-foreground">
          Our professional technician will arrive and fix your issue on the spot. We'll get you back on the road safely
          and quickly.
        </p>
      </div>
    </div>
  )
}
