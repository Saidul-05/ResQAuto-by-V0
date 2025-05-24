import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  licensePlate: string
  color: string
  image: string
}

interface VehicleCardProps {
  vehicle: Vehicle
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-[150px] w-full">
        <Image
          src={vehicle.image || "/placeholder.svg"}
          alt={`${vehicle.make} ${vehicle.model}`}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h3>
          <p className="text-sm text-muted-foreground">
            {vehicle.licensePlate} • {vehicle.color}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-5 w-5" />
              <span className="sr-only">Vehicle options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Vehicle Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/dashboard/edit-vehicle/${vehicle.id}`} className="flex w-full cursor-pointer">
                <Pencil className="mr-2 h-4 w-4" />
                Edit Vehicle
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Remove Vehicle
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-muted-foreground">Make:</span>
            <span className="ml-1 font-medium">{vehicle.make}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Model:</span>
            <span className="ml-1 font-medium">{vehicle.model}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Year:</span>
            <span className="ml-1 font-medium">{vehicle.year}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Color:</span>
            <span className="ml-1 font-medium">{vehicle.color}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={`/emergency?vehicle=${vehicle.id}`}>Request Service for this Vehicle</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
