import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ServiceCardProps {
  title: string
  description: string
  icon: string
  id: string
}

export function ServiceCard({ title, description, icon, id }: ServiceCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <span className="text-3xl">{icon}</span>
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/services/${id}`}>
          <Button variant="outline">Learn More</Button>
        </Link>
        <Link href="/service-request">
          <Button>Request Service</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
