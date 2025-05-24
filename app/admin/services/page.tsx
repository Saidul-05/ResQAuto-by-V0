"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, MoreHorizontal, Edit, Trash, Download, Filter, RefreshCw, Car, DollarSign } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"

// Sample service data
const services = [
  {
    id: "1",
    name: "Flat Tire Replacement",
    category: "Tire Services",
    price: 85.0,
    description: "Replace flat tires with spare or new tire",
    status: "active",
    createdAt: "2022-01-15T10:30:00Z",
    updatedAt: "2023-03-20T14:15:00Z",
  },
  {
    id: "2",
    name: "Battery Jump Start",
    category: "Battery Services",
    price: 65.0,
    description: "Jump start dead batteries",
    status: "active",
    createdAt: "2022-01-20T11:45:00Z",
    updatedAt: "2023-02-10T09:30:00Z",
  },
  {
    id: "3",
    name: "Towing Service",
    category: "Towing",
    price: 120.0,
    description: "Tow vehicles to repair shop or destination",
    status: "active",
    createdAt: "2022-02-05T13:20:00Z",
    updatedAt: "2023-04-15T16:45:00Z",
  },
  {
    id: "4",
    name: "Fuel Delivery",
    category: "Fuel Services",
    price: 75.0,
    description: "Deliver fuel to stranded vehicles",
    status: "active",
    createdAt: "2022-02-10T09:15:00Z",
    updatedAt: "2023-01-25T11:10:00Z",
  },
  {
    id: "5",
    name: "Lockout Assistance",
    category: "Lock Services",
    price: 80.0,
    description: "Help with vehicle lockouts",
    status: "inactive",
    createdAt: "2022-03-01T15:30:00Z",
    updatedAt: "2023-03-05T10:20:00Z",
  },
]

export default function ServicesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [isAddServiceOpen, setIsAddServiceOpen] = useState(false)
  const [newService, setNewService] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    status: "active",
  })
  const { toast } = useToast()

  // Filter services based on search query and active tab
  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && service.status === "active"
    if (activeTab === "inactive") return matchesSearch && service.status === "inactive"

    return matchesSearch
  })

  const handleAddService = () => {
    // In a real app, this would add the service to the database
    toast({
      title: "Service Added",
      description: `${newService.name} has been added to the service catalog.`,
    })
    setIsAddServiceOpen(false)
    setNewService({
      name: "",
      category: "",
      price: "",
      description: "",
      status: "active",
    })
  }

  const handleDeleteService = (serviceId: string, serviceName: string) => {
    // In a real app, this would delete the service from the database
    toast({
      title: "Service Deleted",
      description: `${serviceName} has been deleted.`,
    })
  }

  const getStatusBadge = (status: string) => {
    return status === "active" ? (
      <Badge className="bg-green-500">Active</Badge>
    ) : (
      <Badge variant="outline" className="text-gray-500 border-gray-300">
        Inactive
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground">Manage roadside assistance services</p>
        </div>
        <Dialog open={isAddServiceOpen} onOpenChange={setIsAddServiceOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Service</DialogTitle>
              <DialogDescription>Add a new service to the catalog.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Service Name</Label>
                <Input
                  id="name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={newService.category}
                  onValueChange={(value) => setNewService({ ...newService, category: value })}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tire Services">Tire Services</SelectItem>
                    <SelectItem value="Battery Services">Battery Services</SelectItem>
                    <SelectItem value="Towing">Towing</SelectItem>
                    <SelectItem value="Fuel Services">Fuel Services</SelectItem>
                    <SelectItem value="Lock Services">Lock Services</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="status"
                  checked={newService.status === "active"}
                  onCheckedChange={(checked) =>
                    setNewService({ ...newService, status: checked ? "active" : "inactive" })
                  }
                />
                <Label htmlFor="status">Active</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddServiceOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddService}>Add Service</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Services</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredServices.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No services found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <Car className="mr-2 h-4 w-4 text-muted-foreground" />
                            {service.name}
                          </div>
                        </TableCell>
                        <TableCell>{service.category}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 text-muted-foreground" />
                            {service.price.toFixed(2)}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(service.status)}</TableCell>
                        <TableCell>{new Date(service.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>{new Date(service.updatedAt).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem>View details</DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem
                                className="text-red-600"
                                onClick={() => handleDeleteService(service.id, service.name)}
                              >
                                <Trash className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
