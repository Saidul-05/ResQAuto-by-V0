import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import Link from "next/link"

interface MembershipCardProps {
  title: string
  price: string
  period: string
  features: string[]
  popular?: boolean
}

export function MembershipCard({ title, price, period, features, popular = false }: MembershipCardProps) {
  const id = title.toLowerCase().replace(" ", "-")

  return (
    <Card className={`h-full flex flex-col ${popular ? "border-primary shadow-lg" : ""}`}>
      {popular && (
        <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">Most Popular</div>
      )}
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <span className="text-3xl font-bold">{price}</span> <span className="text-muted-foreground">{period}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Link href={`/membership/${id}`} className="w-full">
          <Button className="w-full" variant={popular ? "default" : "outline"}>
            Choose Plan
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
