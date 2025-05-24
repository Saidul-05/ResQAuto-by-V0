import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, MessageSquare, User } from "lucide-react"
import Link from "next/link"

interface Service {
  id: string
  date: string
  type: string
  location: string
  technician: string
  status: string
  cost: string
  notes: string
}

interface ServiceHistoryItemProps {
  service: Service
}

export function ServiceHistoryItem({ service }: ServiceHistoryItemProps) {
  // Format the date
  const formattedDate = new Date(service.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">{service.type}</CardTitle>
        <Badge variant={service.status === "Completed" ? "outline" : "secondary"}>{service.status}</Badge>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-start">
            <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-start">
            <MapPin className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <span>{service.location}</span>
          </div>
          <div className="flex items-start">
            <User className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
            <span>Technician: {service.technician}</span>
          </div>
          {service.notes && (
            <div className="flex items-start">
              <MessageSquare className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
              <span>{service.notes}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="justify-between">
        <div>
          <span className="text-sm font-medium">Service Cost:</span>
          <span className="ml-1">{service.cost}</span>
        </div>
        <Button variant="outline" size="sm" asChild>
          <Link href={`/dashboard/service/${service.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
