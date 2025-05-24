"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Database, Server, AlertTriangle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function BackendSettingsPage() {
  const { backendProvider, setBackendProvider } = useAuth()
  const [selectedProvider, setSelectedProvider] = useState<"firebase" | "supabase">(backendProvider)
  const { toast } = useToast()

  const handleSaveSettings = () => {
    if (selectedProvider !== backendProvider) {
      setBackendProvider(selectedProvider)

      toast({
        title: "Backend provider changed",
        description: `Successfully switched to ${selectedProvider}. You may need to log in again.`,
      })
    } else {
      toast({
        title: "No changes made",
        description: "The selected backend provider is already active.",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Backend Settings</h1>
        <p className="text-muted-foreground">Configure your backend provider</p>
      </div>

      <Alert variant="warning">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Changing your backend provider will affect how user data is stored and authenticated. You may need to log in
          again after changing providers.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Server className="mr-2 h-5 w-5" /> Backend Provider
          </CardTitle>
          <CardDescription>Choose which backend provider to use for your application</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <RadioGroup
              value={selectedProvider}
              onValueChange={(value) => setSelectedProvider(value as "firebase" | "supabase")}
            >
              <div className="flex items-start space-x-3 rounded-md border p-4 shadow-sm">
                <RadioGroupItem value="firebase" id="firebase-radio" />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="firebase-radio" className="text-base font-medium">
                    Firebase
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Uses Firebase Authentication, Firestore for database, and Firebase Storage for file storage.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 rounded-md border p-4 shadow-sm">
                <RadioGroupItem value="supabase" id="supabase-radio" />
                <div className="flex-1 space-y-1">
                  <Label htmlFor="supabase-radio" className="text-base font-medium">
                    Supabase
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Uses Supabase Authentication, PostgreSQL for database, and Supabase Storage for file storage.
                  </p>
                </div>
              </div>
            </RadioGroup>

            <Alert>
              <Database className="h-4 w-4" />
              <AlertTitle>Current Active Provider</AlertTitle>
              <AlertDescription>
                {backendProvider === "firebase"
                  ? "Firebase is currently being used as your backend provider."
                  : "Supabase is currently being used as your backend provider."}
              </AlertDescription>
            </Alert>

            <Button onClick={handleSaveSettings} className="w-full">
              Save Backend Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
