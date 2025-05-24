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
  Search,
  MoreHorizontal,
  Eye,
  Download,
  Filter,
  RefreshCw,
  Calendar,
  User,
  CreditCard,
  Receipt,
  DollarSign,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Sample payment data
const payments = [
  {
    id: "P-1001",
    customerName: "John Doe",
    customerEmail: "john@example.com",
    amount: 85.0,
    currency: "USD",
    status: "completed",
    paymentMethod: "Credit Card",
    description: "Payment for Flat Tire Replacement",
    relatedTo: "Service",
    relatedId: "B-1001",
    createdAt: "2023-05-10T16:45:00Z",
  },
  {
    id: "P-1002",
    customerName: "Jane Smith",
    customerEmail: "jane@example.com",
    amount: 199.99,
    currency: "USD",
    status: "completed",
    paymentMethod: "PayPal",
    description: "Premium Membership - Annual",
    relatedTo: "Membership",
    relatedId: "M-2001",
    createdAt: "2023-05-11T10:30:00Z",
  },
  {
    id: "P-1003",
    customerName: "Robert Brown",
    customerEmail: "robert@example.com",
    amount: 120.0,
    currency: "USD",
    status: "pending",
    paymentMethod: "Bank Transfer",
    description: "Payment for Towing Service",
    relatedTo: "Service",
    relatedId: "B-1003",
    createdAt: "2023-05-12T11:20:00Z",
  },
  {
    id: "P-1004",
    customerName: "Sarah Williams",
    customerEmail: "sarah@example.com",
    amount: 75.0,
    currency: "USD",
    status: "failed",
    paymentMethod: "Credit Card",
    description: "Payment for Fuel Delivery",
    relatedTo: "Service",
    relatedId: "B-1004",
    createdAt: "2023-05-11T16:45:00Z",
  },
  {
    id: "P-1005",
    customerName: "David Johnson",
    customerEmail: "david@example.com",
    amount: 149.99,
    currency: "USD",
    status: "refunded",
    paymentMethod: "Credit Card",
    description: "Basic Membership - Annual",
    relatedTo: "Membership",
    relatedId: "M-2002",
    createdAt: "2023-05-09T14:15:00Z",
  },
]

export default function PaymentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const { toast } = useToast()

  // Filter payments based on search query and active tab
  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())

    if (activeTab === "all") return matchesSearch
    if (activeTab === "completed") return matchesSearch && payment.status === "completed"
    if (activeTab === "pending") return matchesSearch && payment.status === "pending"
    if (activeTab === "failed") return matchesSearch && payment.status === "failed"
    if (activeTab === "refunded") return matchesSearch && payment.status === "refunded"

    return matchesSearch
  })

  const handleDownloadReceipt = (paymentId: string) => {
    // In a real app, this would generate and download a receipt
    toast({
      title: "Receipt Downloaded",
      description: `Receipt for payment ${paymentId} has been downloaded.`,
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">Completed</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-500">Failed</Badge>
      case "refunded":
        return <Badge className="bg-blue-500">Refunded</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
        <p className="text-muted-foreground">Manage payment transactions</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search payments..."
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
          <TabsTrigger value="all">All Payments</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
          <TabsTrigger value="refunded">Refunded</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab}>
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                        No payments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.id}</TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <div className="flex items-center">
                              <User className="mr-2 h-4 w-4 text-muted-foreground" />
                              {payment.customerName}
                            </div>
                            <span className="text-xs text-muted-foreground">{payment.customerEmail}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center font-medium">
                            <DollarSign className="mr-1 h-3 w-3 text-muted-foreground" />
                            {payment.amount.toFixed(2)} {payment.currency}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(payment.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4 text-muted-foreground" />
                            {payment.paymentMethod}
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="truncate max-w-[200px] block">{payment.description}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                            {new Date(payment.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
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
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDownloadReceipt(payment.id)}>
                                <Receipt className="mr-2 h-4 w-4" />
                                Download Receipt
                              </DropdownMenuItem>
                              {payment.status === "completed" && <DropdownMenuItem>Issue Refund</DropdownMenuItem>}
                              {payment.status === "pending" && <DropdownMenuItem>Mark as Paid</DropdownMenuItem>}
                              <DropdownMenuSeparator />
                              <DropdownMenuItem>View Related {payment.relatedTo}</DropdownMenuItem>
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
