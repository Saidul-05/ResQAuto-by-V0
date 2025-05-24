"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, CreditCard, AlertCircle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { processPayment } from "@/lib/payment"

interface PaymentFormProps {
  amount: number
  currency?: string
  description: string
  onSuccess?: (paymentId: string) => void
  onError?: (error: string) => void
}

export function PaymentForm({ amount, currency = "USD", description, onSuccess, onError }: PaymentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<"credit-card" | "paypal">("credit-card")
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }
      setFormData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Basic validation
      if (paymentMethod === "credit-card") {
        if (formData.cardNumber.replace(/\s/g, "").length !== 16) {
          throw new Error("Invalid card number")
        }

        if (!formData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
          throw new Error("Invalid expiry date format (MM/YY)")
        }

        if (formData.cvv.length < 3) {
          throw new Error("Invalid CVV")
        }
      }

      // Process payment
      const result = await processPayment({
        amount,
        currency,
        description,
        paymentMethod,
        cardDetails:
          paymentMethod === "credit-card"
            ? {
                number: formData.cardNumber.replace(/\s/g, ""),
                name: formData.cardholderName,
                expiry: formData.expiryDate,
                cvv: formData.cvv,
              }
            : undefined,
      })

      if (result.success) {
        setSuccess(true)
        toast({
          title: "Payment successful",
          description: `Your payment of ${currency} ${amount.toFixed(2)} has been processed.`,
        })

        if (onSuccess) {
          onSuccess(result.paymentId)
        }
      } else {
        throw new Error(result.error || "Payment failed")
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Payment processing failed"
      setError(errorMessage)

      if (onError) {
        onError(errorMessage)
      }

      toast({
        title: "Payment failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>
          Complete your payment of {currency} {amount.toFixed(2)} for {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success ? (
          <Alert className="mb-4 bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              Payment successful! Your transaction has been completed.
            </AlertDescription>
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <RadioGroup
              defaultValue="credit-card"
              value={paymentMethod}
              onValueChange={(value) => setPaymentMethod(value as "credit-card" | "paypal")}
              className="flex flex-col space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="credit-card" id="credit-card" />
                <Label htmlFor="credit-card" className="flex items-center">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Credit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="paypal" id="paypal" />
                <Label htmlFor="paypal">PayPal</Label>
              </div>
            </RadioGroup>

            {paymentMethod === "credit-card" && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    maxLength={19} // 16 digits + 3 spaces
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    name="cardholderName"
                    placeholder="John Doe"
                    value={formData.cardholderName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      maxLength={5} // MM/YY
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      type="password"
                      placeholder="123"
                      value={formData.cvv}
                      onChange={handleChange}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="p-4 text-center">
                <p className="mb-4">You will be redirected to PayPal to complete your payment.</p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                `Pay ${currency} ${amount.toFixed(2)}`
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}
