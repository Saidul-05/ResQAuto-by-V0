"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, Database, Upload, Download, RefreshCw, FileJson } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { initializeDatabase, importFromJson } from "@/lib/firebase/schema"

interface DatabaseInitializerProps {
  provider: "firebase" | "supabase"
}

export function DatabaseInitializer({ provider }: DatabaseInitializerProps) {
  const { toast } = useToast()
  const [isInitializing, setIsInitializing] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [progress, setProgress] = useState(0)
  const [jsonData, setJsonData] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Mock steps for the initialization process
  const initSteps = [
    "Creating database schema",
    "Setting up user collections",
    "Configuring service data",
    "Setting up relationships",
    "Finalizing initialization",
  ]

  const handleInitialize = async () => {
    setIsInitializing(true)
    setProgress(0)

    // Simulate progress through steps
    const stepSize = 100 / initSteps.length

    for (let i = 0; i < initSteps.length; i++) {
      // Update the step message
      const currentStep = initSteps[i]

      // Update progress
      setProgress(i * stepSize + 5)

      // Toast to show current step
      toast({
        title: `Step ${i + 1}/${initSteps.length}`,
        description: currentStep,
      })

      // Simulate step processing time
      await new Promise((resolve) => setTimeout(resolve, 800))

      // Update progress at end of step
      setProgress((i + 1) * stepSize)
    }

    // Actually initialize the database
    try {
      const result = await initializeDatabase()

      if (result.success) {
        toast({
          title: "Database Initialized",
          description: result.message,
        })
      } else {
        toast({
          title: "Initialization Failed",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Initialization Error",
        description: String(error),
        variant: "destructive",
      })
    } finally {
      setProgress(100)
      setTimeout(() => {
        setIsInitializing(false)
        setProgress(0)
      }, 1000)
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      setJsonData(content)
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    if (!jsonData) {
      toast({
        title: "No Data",
        description: "Please provide JSON data to import",
        variant: "destructive",
      })
      return
    }

    setIsImporting(true)
    setProgress(0)

    try {
      // Simulate progress
      setProgress(25)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProgress(50)

      // Perform actual import
      const result = await importFromJson(jsonData)

      setProgress(75)
      await new Promise((resolve) => setTimeout(resolve, 500))

      if (result.success) {
        toast({
          title: "Import Successful",
          description: result.message,
        })
      } else {
        toast({
          title: "Import Failed",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Import Error",
        description: String(error),
        variant: "destructive",
      })
    } finally {
      setProgress(100)
      setTimeout(() => {
        setIsImporting(false)
        setProgress(0)
      }, 1000)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Database className="mr-2 h-5 w-5" /> {provider === "firebase" ? "Firebase" : "Supabase"} Database
        </CardTitle>
        <CardDescription>
          {provider === "firebase"
            ? "Initialize and manage your Firebase Firestore database"
            : "Initialize and manage your Supabase PostgreSQL database"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="initialize" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="initialize">Initialize</TabsTrigger>
            <TabsTrigger value="import">Import Data</TabsTrigger>
          </TabsList>

          <TabsContent value="initialize" className="space-y-4">
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Caution</AlertTitle>
              <AlertDescription>
                Initializing the database will create the necessary collections and seed data. This should only be done
                once when setting up the system.
              </AlertDescription>
            </Alert>

            {isInitializing && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  {progress < 100 ? "Initializing..." : "Completed!"}
                </p>
              </div>
            )}

            <Button onClick={handleInitialize} disabled={isInitializing} className="w-full">
              {isInitializing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Initializing...
                </>
              ) : (
                <>
                  <Database className="mr-2 h-4 w-4" />
                  Initialize Database
                </>
              )}
            </Button>
          </TabsContent>

          <TabsContent value="import" className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm">Upload a JSON file with your data or paste JSON directly:</p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload JSON
                </Button>
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".json" className="hidden" />
                <Button
                  variant="outline"
                  onClick={() => {
                    // Create an example structure to help users format their data
                    const example = {
                      users: [{ id: "user1", name: "John Doe", email: "john@example.com" }],
                      services: [{ id: "service1", name: "Tire Change", price: 85 }],
                    }
                    setJsonData(JSON.stringify(example, null, 2))
                  }}
                >
                  <FileJson className="mr-2 h-4 w-4" />
                  Example
                </Button>
              </div>

              <Textarea
                value={jsonData}
                onChange={(e) => setJsonData(e.target.value)}
                placeholder="Paste your JSON data here..."
                className="min-h-[200px] font-mono text-sm"
              />
            </div>

            {isImporting && (
              <div className="space-y-2">
                <Progress value={progress} className="h-2" />
                <p className="text-sm text-muted-foreground text-center">
                  {progress < 100 ? "Importing data..." : "Import completed!"}
                </p>
              </div>
            )}

            <Button onClick={handleImport} disabled={isImporting || !jsonData} className="w-full">
              {isImporting ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Import Data
                </>
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        <p>
          {provider === "firebase"
            ? "Firebase Firestore provides real-time updates and offline support."
            : "Supabase PostgreSQL offers robust relational database capabilities."}
        </p>
      </CardFooter>
    </Card>
  )
}
