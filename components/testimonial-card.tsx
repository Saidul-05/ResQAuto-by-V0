import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"

interface TestimonialCardProps {
  name: string
  location: string
  rating: number
  quote: string
  image: string
}

export function TestimonialCard({ name, location, rating, quote, image }: TestimonialCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="pt-6 flex-grow">
        <div className="flex mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < rating ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"}`}
            />
          ))}
        </div>
        <p className="italic text-muted-foreground">"{quote}"</p>
      </CardContent>
      <CardFooter className="border-t pt-4 flex items-center">
        <Image src={image || "/placeholder.svg"} alt={name} width={40} height={40} className="rounded-full mr-3" />
        <div>
          <p className="font-medium text-sm">{name}</p>
          <p className="text-xs text-muted-foreground">{location}</p>
        </div>
      </CardFooter>
    </Card>
  )
}
