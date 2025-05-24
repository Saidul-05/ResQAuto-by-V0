"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Database, Save, Info, CheckCircle } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useAuth } from "@/lib/auth-context"
import { DatabaseInitializer } from "@/components/admin/database-initializer"

export default function DatabaseSettingsPage() {
  const { toast } = useToast()
  const { backendProvider } = useAuth()

  // Database toggles
  const [enableFirestore, setEnableFirestore] = useState(backendProvider === "firebase")
  const [enableSupabase, setEnableSupabase] = useState(backendProvider === "supabase")
  const [activeDatabasePriority, setActiveDatabasePriority] = useState<"firestore" | "supabase" | null>(
    backendProvider as "firestore" | "supabase",
  )

  // Database testing states
  const [isTestingFirestore, setIsTestingFirestore] = useState(false)
  const [isTestingSupabase, setIsTestingSupabase] = useState(false)
  const [firestoreTestResult, setFirestoreTestResult] = useState<"success" | "error" | null>(null)
  const [supabaseTestResult, setSupabaseTestResult] = useState<"success" | "error" | null>(null)

  // Firebase config
  const [firebaseConfig, setFirebaseConfig] = useState({
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "",
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "",
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "",
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "",
  })

  // Supabase config
  const [supabaseConfig, setSupabaseConfig] = useState({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    serviceKey: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  })

  // Data migration settings
  const [enableMigration, setEnableMigration] = useState(false)
  const [migrationDirection, setMigrationDirection] = useState<"firestore-to-supabase" | "supabase-to-firestore">(
    "firestore-to-supabase",
  )
  const [migrationEntities, setMigrationEntities] = useState({
    users: true,
    services: true,
    bookings: true,
    mechanics: true,
    providers: true,
    transactions: true,
  })

  const handleDatabaseToggle = (type: "firestore" | "supabase", checked: boolean) => {
    if (type === "firestore") {
      setEnableFirestore(checked)
      if (checked && !enableSupabase) {
        setActiveDatabasePriority("firestore")
      } else if (!checked && enableSupabase) {
        setActiveDatabasePriority("supabase")
      } else if (!checked && !enableSupabase) {
        setActiveDatabasePriority(null)
      }
    } else {
      setEnableSupabase(checked)
      if (checked && !enableFirestore) {
        setActiveDatabasePriority("supabase")
      } else if (!checked && enableFirestore) {
        setActiveDatabasePriority("firestore")
      } else if (!checked && !enableFirestore) {
        setActiveDatabasePriority(null)
      }
    }
  }

  const handleSaveSettings = () => {
    // Validation
    if (enableFirestore && (!firebaseConfig.apiKey || !firebaseConfig.projectId || !firebaseConfig.authDomain)) {
      toast({
        title: "Missing Firebase Configuration",
        description: "Please provide the required Firebase configuration values.",
        variant: "destructive",
      })
      return
    }

    if (enableSupabase && (!supabaseConfig.url || !supabaseConfig.anonKey)) {
      toast({
        title: "Missing Supabase Configuration",
        description: "Please provide the required Supabase configuration values.",
        variant: "destructive",
      })
      return
    }

    if (!activeDatabasePriority) {
      toast({
        title: "No Active Database",
        description: "Please enable at least one database provider.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would save settings to your backend
    toast({
      title: "Settings saved",
      description: `Database configuration has been updated. Active database: ${activeDatabasePriority === "firestore" ? "Firebase Firestore" : "Supabase"}.`,
    })
  }

  const handleFirebaseConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFirebaseConfig((prev) => ({ ...prev, [name]: value }))
  }

  const handleSupabaseConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setSupabaseConfig((prev) => ({ ...prev, [name]: value }))
  }

  const handleMigrationEntityToggle = (entity: keyof typeof migrationEntities, checked: boolean) => {
    setMigrationEntities((prev) => ({ ...prev, [entity]: checked }))
  }

  const testDatabaseConnection = (type: "firestore" | "supabase") => {
    if (type === "firestore") {
      setIsTestingFirestore(true)
      // Simulate testing (in a real app, you would test the actual connection)
      setTimeout(() => {
        if (firebaseConfig.apiKey && firebaseConfig.projectId && firebaseConfig.authDomain) {
          setFirestoreTestResult("success")
          toast({
            title: "Firebase Connection Successful",
            description: "Your Firebase configuration is valid and connected successfully.",
          })
        } else {
          setFirestoreTestResult("error")
          toast({
            title: "Firebase Connection Failed",
            description: "Please check your Firebase configuration and try again.",
            variant: "destructive",
          })
        }
        setIsTestingFirestore(false)
      }, 1500)
    } else {
      setIsTestingSupabase(true)
      // Simulate testing (in a real app, you would test the actual connection)
      setTimeout(() => {
        if (supabaseConfig.url && supabaseConfig.anonKey) {
          setSupabaseTestResult("success")
          toast({
            title: "Supabase Connection Successful",
            description: "Your Supabase configuration is valid and connected successfully.",
          })
        } else {
          setSupabaseTestResult("error")
          toast({
            title: "Supabase Connection Failed",
            description: "Please check your Supabase configuration and try again.",
            variant: "destructive",
          })
        }
        setIsTestingSupabase(false)
      }, 1500)
    }
  }

  const runMigration = () => {
    // In a real app, this would trigger a migration process
    const entities = Object.entries(migrationEntities)
      .filter(([_, selected]) => selected)
      .map(([entity]) => entity)

    toast({
      title: "Migration Started",
      description: `Migration from ${migrationDirection === "firestore-to-supabase" ? "Firebase to Supabase" : "Supabase to Firebase"} has been initiated for entities: ${entities.join(", ")}. This may take several minutes.`,
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Database Settings</h1>
        <p className="text-muted-foreground">Configure your database connections and settings</p>
      </div>

      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          Changing your database configuration may affect your application's data. Make sure you have a backup before
          making changes.
        </AlertDescription>
      </Alert>

      <Tabs defaultValue="providers" className="w-full">
        <TabsList>
          <TabsTrigger value="providers">Database Providers</TabsTrigger>
          <TabsTrigger value="initialization">Database Initialization</TabsTrigger>
          <TabsTrigger value="migration">Data Migration</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="providers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" /> Active Database Provider
              </CardTitle>
              <CardDescription>Choose which database provider to use for your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-6">
                  <RadioGroup
                    value={activeDatabasePriority ?? ""}
                    onValueChange={(value) => {
                      setActiveDatabasePriority(value as "firestore" | "supabase")
                      if (value === "firestore") {
                        setEnableFirestore(true)
                        setEnableSupabase(false)
                      } else if (value === "supabase") {
                        setEnableFirestore(false)
                        setEnableSupabase(true)
                      }
                    }}
                  >
                    <div className="flex items-start space-x-3 rounded-md border p-4 shadow-sm">
                      <RadioGroupItem value="firestore" id="firestore-radio" />
                      <div className="flex-1 space-y-1">
                        <Label htmlFor="firestore-radio" className="text-base font-medium">
                          Firebase Firestore
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Uses Firebase Firestore for document storage, Firebase Auth for authentication, and Cloud
                          Functions for server-side logic.
                        </p>
                      </div>
                      {firestoreTestResult === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>

                    <div className="flex items-start space-x-3 rounded-md border p-4 shadow-sm">
                      <RadioGroupItem value="supabase" id="supabase-radio" />
                      <div className="flex-1 space-y-1">
                        <Label htmlFor="supabase-radio" className="text-base font-medium">
                          Supabase
                        </Label>
                        <p className="text-sm text-muted-foreground">
                          Uses Supabase PostgreSQL for database, Supabase Auth for authentication, and real-time
                          subscriptions for live updates.
                        </p>
                      </div>
                      {supabaseTestResult === "success" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    </div>
                  </RadioGroup>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Current Active Provider</AlertTitle>
                  <AlertDescription>
                    {activeDatabasePriority === "firestore"
                      ? "Firebase Firestore is currently being used as your database provider."
                      : activeDatabasePriority === "supabase"
                        ? "Supabase is currently being used as your database provider."
                        : "No database provider is currently active. Please select one."}
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" /> Firebase Firestore
              </CardTitle>
              <CardDescription>Configure Firebase Firestore as your database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-firestore">Enable Firestore</Label>
                  <p className="text-sm text-muted-foreground">Use Firebase Firestore as your primary database</p>
                </div>
                <Switch
                  id="enable-firestore"
                  checked={enableFirestore}
                  onCheckedChange={(checked) => handleDatabaseToggle("firestore", checked)}
                />
              </div>

              {enableFirestore && (
                <div className="space-y-4 border rounded-md p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <Input
                        id="apiKey"
                        name="apiKey"
                        value={firebaseConfig.apiKey}
                        onChange={handleFirebaseConfigChange}
                        placeholder="Your Firebase API Key"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="authDomain">Auth Domain</Label>
                      <Input
                        id="authDomain"
                        name="authDomain"
                        value={firebaseConfig.authDomain}
                        onChange={handleFirebaseConfigChange}
                        placeholder="your-project.firebaseapp.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="projectId">Project ID</Label>
                      <Input
                        id="projectId"
                        name="projectId"
                        value={firebaseConfig.projectId}
                        onChange={handleFirebaseConfigChange}
                        placeholder="your-project-id"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="storageBucket">Storage Bucket</Label>
                      <Input
                        id="storageBucket"
                        name="storageBucket"
                        value={firebaseConfig.storageBucket}
                        onChange={handleFirebaseConfigChange}
                        placeholder="your-project.appspot.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="messagingSenderId">Messaging Sender ID</Label>
                      <Input
                        id="messagingSenderId"
                        name="messagingSenderId"
                        value={firebaseConfig.messagingSenderId}
                        onChange={handleFirebaseConfigChange}
                        placeholder="Your Messaging Sender ID"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="appId">App ID</Label>
                      <Input
                        id="appId"
                        name="appId"
                        value={firebaseConfig.appId}
                        onChange={handleFirebaseConfigChange}
                        placeholder="Your Firebase App ID"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => testDatabaseConnection("firestore")}
                      disabled={isTestingFirestore}
                    >
                      {isTestingFirestore ? "Testing..." : "Test Connection"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" /> Supabase
              </CardTitle>
              <CardDescription>Configure Supabase as your database</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-supabase">Enable Supabase</Label>
                  <p className="text-sm text-muted-foreground">Use Supabase as your primary database</p>
                </div>
                <Switch
                  id="enable-supabase"
                  checked={enableSupabase}
                  onCheckedChange={(checked) => handleDatabaseToggle("supabase", checked)}
                />
              </div>

              {enableSupabase && (
                <div className="space-y-4 border rounded-md p-4">
                  <div className="space-y-2">
                    <Label htmlFor="url">Supabase URL</Label>
                    <Input
                      id="url"
                      name="url"
                      value={supabaseConfig.url}
                      onChange={handleSupabaseConfigChange}
                      placeholder="https://your-project.supabase.co"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="anonKey">Anon Key</Label>
                    <Input
                      id="anonKey"
                      name="anonKey"
                      value={supabaseConfig.anonKey}
                      onChange={handleSupabaseConfigChange}
                      placeholder="Your Supabase Anon Key"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="serviceKey">Service Role Key (Optional)</Label>
                    <Input
                      id="serviceKey"
                      name="serviceKey"
                      value={supabaseConfig.serviceKey}
                      onChange={handleSupabaseConfigChange}
                      placeholder="Your Supabase Service Role Key"
                      type="password"
                    />
                    <p className="text-xs text-muted-foreground">
                      Only use the service role key for server-side operations. Never expose this key to the client.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      onClick={() => testDatabaseConnection("supabase")}
                      disabled={isTestingSupabase}
                    >
                      {isTestingSupabase ? "Testing..." : "Test Connection"}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="initialization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatabaseInitializer provider="firebase" />
            <DatabaseInitializer provider="supabase" />
          </div>
        </TabsContent>

        <TabsContent value="migration" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Migration</CardTitle>
              <CardDescription>Migrate data between database providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="enable-migration">Enable Migration</Label>
                  <p className="text-sm text-muted-foreground">Allow data migration between Firestore and Supabase</p>
                </div>
                <Switch id="enable-migration" checked={enableMigration} onCheckedChange={setEnableMigration} />
              </div>

              {enableMigration && (
                <div className="space-y-4 border rounded-md p-4">
                  <div className="space-y-2">
                    <Label>Migration Direction</Label>
                    <RadioGroup
                      value={migrationDirection}
                      onValueChange={(value) => setMigrationDirection(value as any)}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="firestore-to-supabase" id="firestore-to-supabase" />
                        <Label htmlFor="firestore-to-supabase">Firebase Firestore to Supabase</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="supabase-to-firestore" id="supabase-to-firestore" />
                        <Label htmlFor="supabase-to-firestore">Supabase to Firebase Firestore</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Entities to Migrate</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(migrationEntities).map(([entity, checked]) => (
                        <div key={entity} className="flex items-center space-x-2">
                          <Switch
                            id={`entity-${entity}`}
                            checked={checked}
                            onCheckedChange={(value) => handleMigrationEntityToggle(entity as any, value)}
                          />
                          <Label htmlFor={`entity-${entity}`} className="capitalize">
                            {entity}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Migration Process</AlertTitle>
                    <AlertDescription>
                      Migration can take several minutes depending on the amount of data. Make sure both database
                      providers are properly configured before proceeding.
                    </AlertDescription>
                  </Alert>

                  <Button
                    variant="default"
                    onClick={runMigration}
                    disabled={
                      (migrationDirection === "firestore-to-supabase" && (!enableFirestore || !enableSupabase)) ||
                      (migrationDirection === "supabase-to-firestore" && (!enableFirestore || !enableSupabase)) ||
                      !Object.values(migrationEntities).some(Boolean)
                    }
                  >
                    Start Migration
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cache Settings</CardTitle>
              <CardDescription>Configure caching behavior for database queries</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cache-strategy">Cache Strategy</Label>
                <Select defaultValue="default">
                  <SelectTrigger id="cache-strategy">
                    <SelectValue placeholder="Select a cache strategy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default (Network with cache fallback)</SelectItem>
                    <SelectItem value="cache-first">Cache First</SelectItem>
                    <SelectItem value="network-only">Network Only</SelectItem>
                    <SelectItem value="cache-only">Cache Only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Determines how the application prioritizes network vs cached data when making database queries.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cache-ttl">Cache TTL (Time to Live)</Label>
                <div className="flex items-center space-x-2">
                  <Input type="number" id="cache-ttl" defaultValue="60" min="0" className="w-24" />
                  <Select defaultValue="minutes">
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="seconds">Seconds</SelectItem>
                      <SelectItem value="minutes">Minutes</SelectItem>
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-xs text-muted-foreground">
                  How long cached data remains valid before requiring a refresh from the network.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Switch id="persistence-enabled" defaultChecked />
                <Label htmlFor="persistence-enabled">Enable Persistence</Label>
              </div>
              <p className="text-xs text-muted-foreground">
                Enables offline persistence for database queries, allowing the app to work offline.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security Rules</CardTitle>
              <CardDescription>Configure database access control rules</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="firestore-rules">Firestore Security Rules</Label>
                <Textarea
                  id="firestore-rules"
                  className="font-mono text-sm h-40"
                  placeholder="service cloud.firestore {
match /databases/{database}/documents {
  match /{document=**} {
    allow read, write: if request.auth != null;
  }
}
}"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="row-level-security">Supabase Row-Level Security</Label>
                <Textarea
                  id="row-level-security"
                  className="font-mono text-sm h-40"
                  placeholder="CREATE POLICY user_can_read_own_data
ON users
USING (auth.uid() = id);"
                />
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Security Warning</AlertTitle>
                <AlertDescription>
                  Be careful when modifying security rules. Improper configuration can expose sensitive data or block
                  legitimate access.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSaveSettings} className="w-full">
        <Save className="mr-2 h-4 w-4" /> Save Database Settings
      </Button>
    </div>
  )
}
