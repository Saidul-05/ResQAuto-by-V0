"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { MultiPaymentSystem } from "@/components/payment/multi-payment-system"
import { CheckCircle2, ArrowLeft, AlertCircle } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "success" | "error">("idle")
  const [transactionDetails, setTransactionDetails] = useState<{
    method: string
    id: string
  } | null>(null)

  // This would come from your cart or service selection in a real app
  const orderDetails = {
    id: "ORD-12345",
    service: "Premium Roadside Assistance - 1 Year",
    amount: 149.99,
    date: new Date().toLocaleDateString(),
  }

  const handlePaymentSuccess = (paymentMethod: string, transactionId: string) => {
    setPaymentStatus("success")
    setTransactionDetails({
      method: paymentMethod,
      id: transactionId,
    })
  }

  const handlePaymentError = (error: string) => {
    console.error("Payment error:", error)
    setPaymentStatus("error")
  }

  const handleBackToHome = () => {
    router.push("/")
  }

  const getPaymentMethodName = (method: string) => {
    switch (method) {
      case "card":
        return "Credit/Debit Card"
      case "mobile":
        return "Mobile Banking"
      default:
        return method
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-4xl">
      <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your order details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Order ID</span>
                <span className="font-medium">{orderDetails.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service</span>
                <span className="font-medium">{orderDetails.service}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{orderDetails.date}</span>
              </div>
              <div className="flex justify-between border-t pt-4">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="font-bold">${orderDetails.amount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {paymentStatus === "success" && (
            <Alert className="mt-6 bg-green-50 border-green-200">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertTitle className="text-green-800">Payment Successful!</AlertTitle>
              <AlertDescription className="text-green-700">
                <p>Your payment has been processed successfully.</p>
                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Payment Method:</span>
                    <span>{transactionDetails && getPaymentMethodName(transactionDetails.method)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transaction ID:</span>
                    <span>{transactionDetails?.id}</span>
                  </div>
                </div>
                <Button className="mt-4 bg-green-600 hover:bg-green-700" onClick={handleBackToHome}>
                  Return to Home
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {paymentStatus === "error" && (
            <Alert className="mt-6 bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertTitle className="text-red-800">Payment Failed</AlertTitle>
              <AlertDescription className="text-red-700">
                <p>There was an error processing your payment. Please try again or use a different payment method.</p>
                <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={() => setPaymentStatus("idle")}>
                  Try Again
                </Button>
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          {paymentStatus === "idle" && (
            <MultiPaymentSystem
              amount={orderDetails.amount}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
            />
          )}
        </div>
      </div>
    </div>
  )
}
