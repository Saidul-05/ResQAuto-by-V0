import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InfoIcon, AlertCircle, CheckCircle2, Clock, MapPin, PenToolIcon as Tool, Car, DollarSign } from "lucide-react"

export default function MechanicDashboard() {
  // This would come from your API in a real application
  const activeJobs = [
    {
      id: "JOB-1234",
      customer: "John Smith",
      service: "Flat Tire Replacement",
      location: "123 Main St, Anytown",
      status: "assigned",
      time: "10 minutes ago",
      distance: "2.3 miles away",
      payment: "$85.00",
    },
    {
      id: "JOB-1235",
      customer: "Sarah Johnson",
      service: "Battery Jump Start",
      location: "456 Oak Ave, Anytown",
      status: "in_progress",
      time: "25 minutes ago",
      distance: "1.5 miles away",
      payment: "$65.00",
    },
  ]

  const completedJobs = [
    {
      id: "JOB-1230",
      customer: "Mike Wilson",
      service: "Towing Service",
      location: "789 Pine St, Anytown",
      status: "completed",
      time: "Yesterday, 3:45 PM",
      payment: "$120.00",
    },
    {
      id: "JOB-1229",
      customer: "Emily Davis",
      service: "Fuel Delivery",
      location: "321 Elm St, Anytown",
      status: "completed",
      time: "Yesterday, 1:20 PM",
      payment: "$75.00",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
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
          <h1 className="text-3xl font-bold tracking-tight">Mechanic Dashboard</h1>
          <p className="text-muted-foreground">Manage your roadside assistance jobs and earnings</p>
        </div>
        <Button>
          <Clock className="mr-2 h-4 w-4" />
          Update Availability
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Active Mode</AlertTitle>
        <AlertDescription>
          You are currently active and can receive new job assignments. Toggle your availability if you need a break.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Earnings</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$150.00</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Jobs Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
            <Tool className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Rating</CardTitle>
            <InfoIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9/5</div>
            <p className="text-xs text-muted-foreground">Based on 28 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="relative">
            Active Jobs
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {activeJobs.length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="completed">Completed Jobs</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="space-y-4">
          {activeJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{job.service}</CardTitle>
                    <CardDescription>{job.customer}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {getStatusBadge(job.status)}
                    <span className="text-xs text-muted-foreground">{job.time}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.location}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{job.distance}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span>{job.service}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{job.payment}</span>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-4 pt-0 flex gap-2">
                <Button className="w-full" variant={job.status === "assigned" ? "default" : "outline"}>
                  {job.status === "assigned" ? "Accept Job" : "Complete Job"}
                </Button>
                <Button variant="outline" className="w-full">
                  Contact Customer
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          {completedJobs.map((job) => (
            <Card key={job.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{job.service}</CardTitle>
                    <CardDescription>{job.customer}</CardDescription>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    {getStatusBadge(job.status)}
                    <span className="text-xs text-muted-foreground">{job.time}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="grid gap-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="h-4 w-4 text-muted-foreground" />
                    <span>{job.service}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>{job.payment}</span>
                  </div>
                </div>
              </CardContent>
              <div className="px-6 pb-4 pt-0">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
