"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Car, Wrench, Building2, User } from "lucide-react"

interface RoleSelectionProps {
  onRoleSelect: (role: string) => void
  selectedRole: string
}

export function RoleSelection({ onRoleSelect, selectedRole }: RoleSelectionProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Choose Account Type</CardTitle>
        <CardDescription>Select the type of account you want to create</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup value={selectedRole} onValueChange={onRoleSelect} className="grid gap-4 md:grid-cols-2">
          <div>
            <RadioGroupItem value="customer" id="customer" className="peer sr-only" />
            <Label
              htmlFor="customer"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Car className="mb-3 h-6 w-6" />
              <div className="text-center">
                <p className="font-medium">Customer</p>
                <p className="text-sm text-muted-foreground">Request roadside assistance and vehicle services</p>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="mechanic" id="mechanic" className="peer sr-only" />
            <Label
              htmlFor="mechanic"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Wrench className="mb-3 h-6 w-6" />
              <div className="text-center">
                <p className="font-medium">Mechanic</p>
                <p className="text-sm text-muted-foreground">Provide roadside assistance and repair services</p>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="provider" id="provider" className="peer sr-only" />
            <Label
              htmlFor="provider"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Building2 className="mb-3 h-6 w-6" />
              <div className="text-center">
                <p className="font-medium">Service Provider</p>
                <p className="text-sm text-muted-foreground">Manage a fleet of mechanics and service offerings</p>
              </div>
            </Label>
          </div>

          <div>
            <RadioGroupItem value="business" id="business" className="peer sr-only" />
            <Label
              htmlFor="business"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <User className="mb-3 h-6 w-6" />
              <div className="text-center">
                <p className="font-medium">Business Customer</p>
                <p className="text-sm text-muted-foreground">Manage fleet vehicles and corporate accounts</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  )
}
