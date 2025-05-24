import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, Users, Car, DollarSign, Package, AlertCircle, MapPin } from "lucide-react"

export default function ProviderDashboard() {
  // This would come from your API in a real application
  const activeOrders = [
    {
      id: "ORD-1234",
      customer: "John Smith",
      service: "Flat Tire Replacement",
      location: "123 Main St, Anytown",
      status: "assigned",
      assignedTo: "Mike Wilson",
      time: "10 minutes ago",
      payment: "$85.00",
    },
    {
      id: "ORD-1235",
      customer: "Sarah Johnson",
      service: "Battery Jump Start",
      location: "456 Oak Ave, Anytown",
      status: "in_progress",
      assignedTo: "Emily Davis",
      time: "25 minutes ago",
      payment: "$65.00",
    },
    {
      id: "ORD-1236",
      customer: "Robert Brown",
      service: "Towing Service",
      location: "789 Pine St, Anytown",
      status: "pending",
      assignedTo: null,
      time: "5 minutes ago",
      payment: "$120.00",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
            Pending
          </Badge>
        )
      case "assigned":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            Assigned
          </Badge>
        )
      case "in_progress":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            In Progress
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            Completed
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Service Provider Dashboard</h1>
          <p className="text-muted-foreground">Manage your roadside assistance services and mechanics</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Users className="mr-2 h-4 w-4" />
            Manage Mechanics
          </Button>
          <Button>
            <Package className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,580.00</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Mechanics</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 currently on jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Services Offered</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across 3 categories</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">Based on 156 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="relative">
            Active Orders
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {activeOrders.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="mechanics">Mechanics</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {activeOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{order.service}</CardTitle>
                    <CardDescription>{order.customer}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {getStatusBadge(order.status)}
                    <span className="text-xs text-muted-foreground">{order.time}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{order.location}</span>
                  </div>
                  {order.assignedTo ? (
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span>Assigned to: {order.assignedTo}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                      <span className="text-orange-500">Needs assignment</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{order.payment}</span>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-4 pt-0 flex gap-2">
                {!order.assignedTo ? (
                  <Button className="w-full">Assign Mechanic</Button>
                ) : (
                  <Button variant="outline" className="w-full">
                    Track Progress
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  Contact Customer
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Service Offerings</CardTitle>
              <CardDescription>Manage the services your company provides to customers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Service Cards */}
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Flat Tire Replacement</CardTitle>
                      <Badge className="mt-1">Popular</Badge>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Replace flat tires with spare or new tire</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">$85.00</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Active
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Battery Jump Start</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Jump start dead batteries</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">$65.00</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Active
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">Towing Service</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-2">Tow vehicles to repair shop or destination</p>
                      <div className="flex justify-between items-center">
                        <span className="font-medium">$120.00</span>
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Active
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full">
                  <Package className="mr-2 h-4 w-4" />
                  Add New Service
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="mechanics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Mechanics</CardTitle>
              <CardDescription>Manage your team of roadside assistance mechanics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Mechanic Cards */}
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium">MW</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">Mike Wilson</CardTitle>
                          <CardDescription>Senior Mechanic</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge variant="outline" className="bg-green-50 text-green-700">
                            Active
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rating</span>
                          <span>4.9/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Jobs Today</span>
                          <span>3</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="font-medium">ED</span>
                        </div>
                        <div>
                          <CardTitle className="text-lg">Emily Davis</CardTitle>
                          <CardDescription>Mechanic</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Status</span>
                          <Badge variant="outline" className="bg-yellow-50 text-yellow-700">
                            On Job
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Rating</span>
                          <span>4.7/5</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Jobs Today</span>
                          <span>2</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Button className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Add New Mechanic
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
