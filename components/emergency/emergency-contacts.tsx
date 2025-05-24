"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Loader2, Plus, Trash2, Phone, Edit, User, AlertTriangle, Info, Heart, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EmergencyContact {
  id: string
  name: string
  relationship: string
  phone: string
  priority: number
}

interface EmergencyService {
  id: string
  name: string
  phone: string
  description: string
  website?: string
}

// Sample data
const initialContacts: EmergencyContact[] = [
  {
    id: "1",
    name: "John Smith",
    relationship: "Spouse",
    phone: "+1 (555) 123-4567",
    priority: 1,
  },
  {
    id: "2",
    name: "Mary Johnson",
    relationship: "Parent",
    phone: "+1 (555) 987-6543",
    priority: 2,
  },
]

// Sample emergency services
const emergencyServices: EmergencyService[] = [
  {
    id: "police",
    name: "Police Department",
    phone: "911",
    description: "For emergencies requiring police assistance",
  },
  {
    id: "fire",
    name: "Fire Department",
    phone: "911",
    description: "For fire emergencies and rescue operations",
  },
  {
    id: "ambulance",
    name: "Ambulance Services",
    phone: "911",
    description: "For medical emergencies requiring immediate attention",
  },
  {
    id: "poison",
    name: "Poison Control Center",
    phone: "1-800-222-1222",
    description: "For poisoning emergencies and information",
    website: "https://www.poison.org/",
  },
  {
    id: "roadside",
    name: "RoadRescue Emergency Line",
    phone: "1-800-555-ROAD",
    description: "Our 24/7 emergency roadside assistance hotline",
  },
]

export function EmergencyContacts() {
  const [contacts, setContacts] = useState<EmergencyContact[]>(initialContacts)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
    priority: 1,
  })
  const { toast } = useToast()

  // Load contacts from localStorage on component mount
  useEffect(() => {
    const savedContacts = localStorage.getItem("emergencyContacts")
    if (savedContacts) {
      try {
        setContacts(JSON.parse(savedContacts))
      } catch (e) {
        console.error("Error parsing saved contacts:", e)
      }
    }
  }, [])

  // Save contacts to localStorage when they change
  useEffect(() => {
    localStorage.setItem("emergencyContacts", JSON.stringify(contacts))
  }, [contacts])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validatePhone = (phone: string) => {
    // Basic phone validation - can be enhanced based on requirements
    return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(phone)
  }

  const handleAddContact = async () => {
    setIsSubmitting(true)

    // Validate form
    if (!formData.name || !formData.phone) {
      toast({
        title: "Missing information",
        description: "Please provide a name and phone number.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    if (!validatePhone(formData.phone)) {
      toast({
        title: "Invalid phone number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (editingContact) {
      // Update existing contact
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === editingContact.id ? { ...contact, ...formData, priority: Number(formData.priority) } : contact,
        ),
      )

      toast({
        title: "Contact updated",
        description: `${formData.name} has been updated in your emergency contacts.`,
      })
    } else {
      // Add new contact
      const newContact: EmergencyContact = {
        id: Date.now().toString(),
        ...formData,
        priority: Number(formData.priority),
      }

      setContacts((prev) => [...prev, newContact])

      toast({
        title: "Contact added",
        description: `${formData.name} has been added to your emergency contacts.`,
      })
    }

    // Reset form and close dialog
    setFormData({ name: "", relationship: "", phone: "", priority: 1 })
    setEditingContact(null)
    setIsSubmitting(false)
    setIsAddDialogOpen(false)
  }

  const handleEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact)
    setFormData({
      name: contact.name,
      relationship: contact.relationship,
      phone: contact.phone,
      priority: contact.priority,
    })
    setIsAddDialogOpen(true)
  }

  const handleDeleteContact = async (id: string) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const contactToDelete = contacts.find((c) => c.id === id)

    setContacts((prev) => prev.filter((contact) => contact.id !== id))

    toast({
      title: "Contact removed",
      description: contactToDelete
        ? `${contactToDelete.name} has been removed from your emergency contacts.`
        : "Contact has been removed.",
    })
  }

  const handleCallService = (phone: string) => {
    // In a real app, this would use the tel: protocol to initiate a call
    window.location.href = `tel:${phone}`
  }

  // Sort contacts by priority
  const sortedContacts = [...contacts].sort((a, b) => a.priority - b.priority)

  return (
    <div className="space-y-4">
      <Card className="border-2 border-primary/20 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-lg">
            <Shield className="h-5 w-5 mr-2 text-primary" />
            Emergency Contact Management
          </CardTitle>
          <CardDescription>Add and manage your emergency contacts for quick access during emergencies</CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <Tabs defaultValue="contacts" className="w-full">
            <TabsList className="w-full mb-4 grid grid-cols-2">
              <TabsTrigger value="contacts" className="text-xs sm:text-sm">
                Personal Contacts
              </TabsTrigger>
              <TabsTrigger value="services" className="text-xs sm:text-sm">
                Emergency Services
              </TabsTrigger>
            </TabsList>

            <TabsContent value="contacts">
              {contacts.length === 0 ? (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>No emergency contacts</AlertTitle>
                  <AlertDescription>
                    You haven't added any emergency contacts yet. We recommend adding at least one contact who can be
                    reached in case of an emergency.
                  </AlertDescription>
                </Alert>
              ) : (
                <div className="space-y-3">
                  {sortedContacts.map((contact) => (
                    <div key={contact.id} className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center">
                        <div className="bg-primary/10 p-2 rounded-full mr-3">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{contact.name}</p>
                            {contact.priority === 1 && (
                              <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                          <p className="text-sm flex items-center mt-1">
                            <Phone className="h-3 w-3 mr-1" />
                            {contact.phone}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap justify-end">
                        <Button variant="outline" size="sm" onClick={() => handleCallService(contact.phone)}>
                          <Phone className="h-4 w-4 mr-1" />
                          Call
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEditContact(contact)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDeleteContact(contact.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button className="w-full mt-4" onClick={() => setIsAddDialogOpen(true)} variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Emergency Contact
              </Button>
            </TabsContent>

            <TabsContent value="services">
              <Alert className="mb-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Important Information</AlertTitle>
                <AlertDescription>In case of a life-threatening emergency, always call 911 first.</AlertDescription>
              </Alert>

              <div className="space-y-3">
                {emergencyServices.map((service) => (
                  <div
                    key={service.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 border rounded-md gap-3"
                  >
                    <div>
                      <p className="font-medium">{service.name}</p>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                      <div className="flex items-center mt-1">
                        <Phone className="h-3 w-3 mr-1" />
                        <span className="text-sm font-medium">{service.phone}</span>
                      </div>
                    </div>
                    <div className="flex gap-2 self-end sm:self-center">
                      <Button variant="default" size="sm" onClick={() => handleCallService(service.phone)}>
                        <Phone className="h-4 w-4 mr-1" />
                        Call Now
                      </Button>
                      {service.website && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={service.website} target="_blank" rel="noopener noreferrer">
                            Website
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" variant="default" asChild>
            <a href="/emergency-contacts">
              <Heart className="mr-2 h-4 w-4" />
              Manage All Emergency Contacts
            </a>
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingContact ? "Edit Contact" : "Add Emergency Contact"}</DialogTitle>
            <DialogDescription>Add someone who should be contacted in case of an emergency.</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" placeholder="John Smith" value={formData.name} onChange={handleChange} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="relationship">Relationship</Label>
              <Select
                value={formData.relationship}
                onValueChange={(value) => handleSelectChange("relationship", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select relationship" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Spouse">Spouse</SelectItem>
                  <SelectItem value="Parent">Parent</SelectItem>
                  <SelectItem value="Child">Child</SelectItem>
                  <SelectItem value="Sibling">Sibling</SelectItem>
                  <SelectItem value="Friend">Friend</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                placeholder="+1 (555) 123-4567"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority.toString()}
                onValueChange={(value) => handleSelectChange("priority", Number.parseInt(value))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Primary Contact</SelectItem>
                  <SelectItem value="2">Secondary Contact</SelectItem>
                  <SelectItem value="3">Tertiary Contact</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">
                Primary contacts will be called first in case of emergency
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setIsAddDialogOpen(false)
                setEditingContact(null)
                setFormData({ name: "", relationship: "", phone: "", priority: 1 })
              }}
            >
              Cancel
            </Button>
            <Button onClick={handleAddContact} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : editingContact ? (
                "Update Contact"
              ) : (
                "Add Contact"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
