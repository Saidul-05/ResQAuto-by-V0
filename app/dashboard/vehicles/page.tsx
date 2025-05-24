"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Edit, MoreHorizontal, Plus, Trash2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Sample vehicles data
const vehicles = [
  {
    id: "v1",
    make: "Toyota",
    model: "Camry",
    year: 2019,
    licensePlate: "ABC-1234",
    color: "Silver",
    vin: "1HGCM82633A123456",
    status: "Primary",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "v2",
    make: "Honda",
    model: "CR-V",
    year: 2021,
    licensePlate: "XYZ-5678",
    color: "Blue",
    vin: "5XYZU3LB5DG123456",
    status: "Active",
    image: "/placeholder.svg?height=150&width=300",
  },
  {
    id: "v3",
    make: "Ford",
    model: "F-150",
    year: 2020,
    licensePlate: "DEF-9012",
    color: "Black",
    vin: "1FTFW1ET5DFA12345",
    status: "Active",
    image: "/placeholder.svg?height=150&width=300",
  },
]

export default function VehiclesPage() {
  const [isAddingVehicle, setIsAddingVehicle] = useState(false)
  const [newVehicle, setNewVehicle] = useState({
    make: "",
    model: "",
    year: "",
    licensePlate: "",
    color: "",
    vin: "",
  })
  const { toast } = useToast()

  const handleAddVehicle = () => {
    // Validate form
    if (!newVehicle.make || !newVehicle.model || !newVehicle.year || !newVehicle.licensePlate) {
      toast({
        title: "Missing Information",
        description: "Please fill out all required fields.",
        variant: "destructive",
      })
      return
    }

    // Here you would send data to your backend
    toast({
      title: "Vehicle Added",
      description: `Your ${newVehicle.year} ${newVehicle.make} ${newVehicle.model} has been added.`,
    })

    // Reset form and close dialog
    setNewVehicle({
      make: "",
      model: "",
      year: "",
      licensePlate: "",
      color: "",
      vin: "",
    })
    setIsAddingVehicle(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewVehicle((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewVehicle((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Vehicles</h1>
          <p className="text-muted-foreground">
            Manage your vehicles for faster service when you need roadside assistance
          </p>
        </div>
        <Button className="mt-4 md:mt-0" onClick={() => setIsAddingVehicle(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add Vehicle
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles.map((vehicle) => (
          <Card key={vehicle.id} className="overflow-hidden flex flex-col">
            <div className="relative h-[150px] w-full">
              <Image
                src={vehicle.image || "/placeholder.svg"}
                alt={`${vehicle.make} ${vehicle.model}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant={vehicle.status === "Primary" ? "default" : "outline"}>{vehicle.status}</Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">
                  {vehicle.year} {vehicle.make} {vehicle.model}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-5 w-5" />
                      <span className="sr-only">Vehicle options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Vehicle Options</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/dashboard/vehicles/${vehicle.id}/edit`} className="cursor-pointer">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Vehicle
                      </Link>
                    </DropdownMenuItem>
                    {vehicle.status !== "Primary" && (
                      <DropdownMenuItem>
                        <Car className="mr-2 h-4 w-4" />
                        Set as Primary
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="text-destructive focus:text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Remove Vehicle
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <CardDescription>
                {vehicle.licensePlate} • {vehicle.color}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2 text-sm">
                <div className="grid grid-cols-2 gap-2">
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
                <div>
                  <span className="text-muted-foreground">VIN:</span>
                  <span className="ml-1 font-medium">{vehicle.vin}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0 mt-auto">
              <Button asChild variant="outline" className="w-full">
                <Link href={`/emergency?vehicle=${vehicle.id}`}>Request Service for this Vehicle</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isAddingVehicle} onOpenChange={setIsAddingVehicle}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add a New Vehicle</DialogTitle>
            <DialogDescription>
              Add your vehicle information for faster service when you need roadside assistance.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="make">
                  Make <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="make"
                  name="make"
                  placeholder="Toyota"
                  value={newVehicle.make}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">
                  Model <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="model"
                  name="model"
                  placeholder="Camry"
                  value={newVehicle.model}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="year">
                  Year <span className="text-destructive">*</span>
                </Label>
                <Select value={newVehicle.year} onValueChange={(value) => handleSelectChange("year", value)}>
                  <SelectTrigger id="year">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i).map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <Input
                  id="color"
                  name="color"
                  placeholder="Silver"
                  value={newVehicle.color}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="licensePlate">
                  License Plate <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="licensePlate"
                  name="licensePlate"
                  placeholder="ABC-1234"
                  value={newVehicle.licensePlate}
                  onChange={handleInputChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vin">VIN (Optional)</Label>
                <Input
                  id="vin"
                  name="vin"
                  placeholder="Vehicle Identification Number"
                  value={newVehicle.vin}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingVehicle(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddVehicle}>Add Vehicle</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
