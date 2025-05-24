"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Loader2, CreditCard, CheckCircle, FileText, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { processPayment } from "@/lib/payment"

interface MultiPaymentSystemProps {
  amount: number
  currency?: string
  description: string
  onSuccess?: (paymentId: string, method: string) => void
  onError?: (error: string) => void
  availableMethods?: string[]
}

export function MultiPaymentSystem({
  amount,
  currency = "USD",
  description,
  onSuccess,
  onError,
  availableMethods = ["credit-card", "paypal", "bkash", "nagad", "sslcommerz"],
}: MultiPaymentSystemProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [selectedTab, setSelectedTab] = useState<string>(availableMethods[0] || "credit-card")

  // Credit card form data
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardholderName: "",
    expiryDate: "",
    cvv: "",
  })

  // Mobile banking form data
  const [mobileData, setMobileData] = useState({
    phoneNumber: "",
    transactionId: "",
  })

  // Payment selection for methods that require it
  const [paymentSelection, setPaymentSelection] = useState<string>("personal")

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Format card number with spaces
    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setCardData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    // Format expiry date with slash
    if (name === "expiryDate") {
      const cleaned = value.replace(/\D/g, "")
      let formatted = cleaned
      if (cleaned.length > 2) {
        formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`
      }
      setCardData((prev) => ({ ...prev, [name]: formatted }))
      return
    }

    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setMobileData((prev) => ({ ...prev, [name]: value }))
  }

  const validateCreditCard = (): boolean => {
    if (cardData.cardNumber.replace(/\s/g, "").length !== 16) {
      setError("Invalid card number")
      return false
    }

    if (!cardData.expiryDate.match(/^\d{2}\/\d{2}$/)) {
      setError("Invalid expiry date format (MM/YY)")
      return false
    }

    if (cardData.cvv.length < 3) {
      setError("Invalid CVV")
      return false
    }

    if (!cardData.cardholderName) {
      setError("Cardholder name is required")
      return false
    }

    return true
  }

  const validateMobileBanking = (): boolean => {
    if (!mobileData.phoneNumber || mobileData.phoneNumber.length < 10) {
      setError("Valid phone number is required")
      return false
    }

    if (!mobileData.transactionId) {
      setError("Transaction ID is required")
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Validate based on payment method
      let isValid = true

      if (selectedTab === "credit-card") {
        isValid = validateCreditCard()
      } else if (["bkash", "nagad"].includes(selectedTab)) {
        isValid = validateMobileBanking()
      }

      if (!isValid) {
        setIsLoading(false)
        return
      }

      // Process payment based on selected method
      const result = await processPayment({
        amount,
        currency,
        description,
        paymentMethod: selectedTab as any,
        cardDetails:
          selectedTab === "credit-card"
            ? {
                number: cardData.cardNumber.replace(/\s/g, ""),
                name: cardData.cardholderName,
                expiry: cardData.expiryDate,
                cvv: cardData.cvv,
              }
            : undefined,
        mobileDetails: ["bkash", "nagad"].includes(selectedTab)
          ? {
              phoneNumber: mobileData.phoneNumber,
              transactionId: mobileData.transactionId,
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
          onSuccess(result.paymentId || "", selectedTab)
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

  // Filter the available payment methods
  const filteredMethods = availableMethods.filter((method) =>
    ["credit-card", "paypal", "bkash", "nagad", "sslcommerz"].includes(method),
  )

  return (
    <Card className="w-full max-w-lg mx-auto">
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
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList
                className="grid"
                style={{ gridTemplateColumns: `repeat(${filteredMethods.length}, minmax(0, 1fr))` }}
              >
                {filteredMethods.includes("credit-card") && (
                  <TabsTrigger value="credit-card" className="flex items-center gap-1">
                    <CreditCard className="h-4 w-4" />
                    <span className="hidden sm:inline">Credit Card</span>
                  </TabsTrigger>
                )}
                {filteredMethods.includes("paypal") && (
                  <TabsTrigger value="paypal" className="flex items-center gap-1">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.978a.64.64 0 0 1 .632-.54h6.012c2.735 0 4.658.934 5.47 2.325.383.619.707 1.361.619 2.282-.031.32-.066.65-.124.995 0 .056-.01.1-.022.157-.631 3.581-2.915 5.44-6.558 5.44h-.522c-.634 0-.927.462-1.005.89l-.837 4.667a.64.64 0 0 1-.633.542z" />
                      <path d="M19.933 7.869a5.06 5.06 0 0 0-.315-.749c-.987-1.913-3.398-2.571-6.205-2.571H7.401a.858.858 0 0 0-.845.719L3.441 20.54a.513.513 0 0 0 .506.588h4.572l-.54.303c-.055.303.167.587.46.587h3.84a.768.768 0 0 0 .755-.651l.032-.157.596-3.838.04-.213a.768.768 0 0 1 .756-.651h.483c3.059 0 5.453-1.258 6.15-4.889.292-1.514.157-2.762-.663-3.67a2.822 2.822 0 0 0-.495-.36z" />
                    </svg>
                    <span className="hidden sm:inline">PayPal</span>
                  </TabsTrigger>
                )}
                {filteredMethods.includes("bkash") && (
                  <TabsTrigger value="bkash" className="flex items-center gap-1">
                    <span className="text-pink-600 font-bold text-xs">bKash</span>
                  </TabsTrigger>
                )}
                {filteredMethods.includes("nagad") && (
                  <TabsTrigger value="nagad" className="flex items-center gap-1">
                    <span className="text-orange-600 font-bold text-xs">Nagad</span>
                  </TabsTrigger>
                )}
                {filteredMethods.includes("sslcommerz") && (
                  <TabsTrigger value="sslcommerz" className="flex items-center gap-1">
                    <span className="text-green-600 font-bold text-xs">SSLCommerz</span>
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="credit-card" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Cardholder Name</Label>
                  <Input
                    id="cardholderName"
                    name="cardholderName"
                    placeholder="John Doe"
                    value={cardData.cardholderName}
                    onChange={handleCardChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={handleCardChange}
                    maxLength={19} // 16 digits + 3 spaces
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
                      value={cardData.expiryDate}
                      onChange={handleCardChange}
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
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      maxLength={4}
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="paypal" className="pt-4 space-y-4">
                <div className="p-4 text-center">
                  <svg className="mx-auto h-10 w-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.978a.64.64 0 0 1 .632-.54h6.012c2.735 0 4.658.934 5.47 2.325.383.619.707 1.361.619 2.282-.031.32-.066.65-.124.995 0 .056-.01.1-.022.157-.631 3.581-2.915 5.44-6.558 5.44h-.522c-.634 0-.927.462-1.005.89l-.837 4.667a.64.64 0 0 1-.633.542z" />
                    <path d="M19.933 7.869a5.06 5.06 0 0 0-.315-.749c-.987-1.913-3.398-2.571-6.205-2.571H7.401a.858.858 0 0 0-.845.719L3.441 20.54a.513.513 0 0 0 .506.588h4.572l-.54.303c-.055.303.167.587.46.587h3.84a.768.768 0 0 0 .755-.651l.032-.157.596-3.838.04-.213a.768.768 0 0 1 .756-.651h.483c3.059 0 5.453-1.258 6.15-4.889.292-1.514.157-2.762-.663-3.67a2.822 2.822 0 0 0-.495-.36z" />
                  </svg>
                  <p className="mt-4 mb-6">You will be redirected to PayPal to complete your payment.</p>
                  <p className="text-sm text-muted-foreground">
                    PayPal is a secure payment method that lets you pay without sharing your financial information.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="bkash" className="pt-4 space-y-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-md bg-pink-50 border border-pink-100">
                    <h3 className="font-medium text-pink-700">bKash Payment Instructions</h3>
                    <ol className="mt-2 ml-4 list-decimal text-sm text-pink-700">
                      <li>Dial *247# from your bKash registered mobile number</li>
                      <li>Select 'Send Money'</li>
                      <li>Enter the recipient number: 01712345678</li>
                      <li>
                        Enter amount: {amount.toFixed(2)} {currency}
                      </li>
                      <li>Enter reference: RoadRescue</li>
                      <li>Enter your bKash PIN to confirm</li>
                      <li>Save the Transaction ID and enter it below</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">bKash Account Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="01XXXXXXXXX"
                      value={mobileData.phoneNumber}
                      onChange={handleMobileChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID</Label>
                    <Input
                      id="transactionId"
                      name="transactionId"
                      placeholder="TrxID12345678"
                      value={mobileData.transactionId}
                      onChange={handleMobileChange}
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="nagad" className="pt-4 space-y-4">
                <div className="space-y-4">
                  <div className="p-4 rounded-md bg-orange-50 border border-orange-100">
                    <h3 className="font-medium text-orange-700">Nagad Payment Instructions</h3>
                    <ol className="mt-2 ml-4 list-decimal text-sm text-orange-700">
                      <li>Open your Nagad app or dial *167#</li>
                      <li>Select 'Send Money'</li>
                      <li>Enter the recipient number: 01712345678</li>
                      <li>
                        Enter amount: {amount.toFixed(2)} {currency}
                      </li>
                      <li>Enter reference: RoadRescue</li>
                      <li>Enter your Nagad PIN to confirm</li>
                      <li>Save the Transaction ID and enter it below</li>
                    </ol>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phoneNumber">Nagad Account Number</Label>
                    <Input
                      id="phoneNumber"
                      name="phoneNumber"
                      placeholder="01XXXXXXXXX"
                      value={mobileData.phoneNumber}
                      onChange={handleMobileChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="transactionId">Transaction ID</Label>
                    <Input
                      id="transactionId"
                      name="transactionId"
                      placeholder="TrxID12345678"
                      value={mobileData.transactionId}
                      onChange={handleMobileChange}
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="sslcommerz" className="pt-4 space-y-4">
                <div className="p-4 text-center">
                  <FileText className="mx-auto h-10 w-10 text-green-600" />
                  <p className="mt-4 mb-6">
                    You will be redirected to SSLCommerz secure payment gateway to complete your payment.
                  </p>
                  <RadioGroup defaultValue="personal" className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="personal" id="personal" onClick={() => setPaymentSelection("personal")} />
                      <Label htmlFor="personal" className="flex flex-col">
                        <span>Personal</span>
                        <span className="text-xs text-muted-foreground">Mobile/Internet Banking</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 rounded-md border p-3">
                      <RadioGroupItem value="business" id="business" onClick={() => setPaymentSelection("business")} />
                      <Label htmlFor="business" className="flex flex-col">
                        <span>Business</span>
                        <span className="text-xs text-muted-foreground">Corporate Banking</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
              </TabsContent>
            </Tabs>

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
      <CardFooter className="justify-between border-t pt-4 text-xs text-muted-foreground">
        <div className="flex items-center">
          <Lock className="mr-1 h-3 w-3" />
          Secure payment
        </div>
        <div>24/7 Customer Support</div>
      </CardFooter>
    </Card>
  )
}

// Lock icon added at the bottom
function Lock(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
