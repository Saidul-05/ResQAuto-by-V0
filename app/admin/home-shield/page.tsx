"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Check, Edit, Plus, Save, Trash2 } from "lucide-react"

interface HomeShieldPlan {
  id: string
  name: string
  price: number
  currency: string
  interval: string
  description: string
  features: string[]
  popular?: boolean
  active: boolean
}

const defaultPlans: HomeShieldPlan[] = [
  {
    id: "basic",
    name: "Basic Shield",
    price: 9.99,
    currency: "USD",
    interval: "month",
    description: "Essential home protection for peace of mind",
    features: [
      "24/7 emergency assistance",
      "Home lockout service",
      "Basic plumbing issues",
      "Electrical emergencies",
      "10% discount on all repairs",
    ],
    active: true,
  },
  {
    id: "premium",
    name: "Premium Shield",
    price: 19.99,
    currency: "USD",
    interval: "month",
    description: "Comprehensive coverage for your home",
    features: [
      "All Basic Shield features",
      "HVAC emergency service",
      "Appliance breakdown assistance",
      "Annual home safety inspection",
      "20% discount on all repairs",
      "Priority scheduling",
    ],
    popular: true,
    active: true,
  },
  {
    id: "ultimate",
    name: "Ultimate Shield",
    price: 29.99,
    currency: "USD",
    interval: "month",
    description: "Complete protection for your home and family",
    features: [
      "All Premium Shield features",
      "Pest control emergencies",
      "Roof leak assistance",
      "Smart home device support",
      "30% discount on all repairs",
      "VIP priority service",
      "Free annual maintenance check",
    ],
    active: true,
  },
]

export default function HomeShieldAdmin() {
  const [plans, setPlans] = useState<HomeShieldPlan[]>(defaultPlans)
  const [editingPlan, setEditingPlan] = useState<HomeShieldPlan | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newFeature, setNewFeature] = useState("")

  const handleToggleActive = (planId: string) => {
    setPlans(plans.map((plan) => (plan.id === planId ? { ...plan, active: !plan.active } : plan)))

    toast({
      title: "Plan updated",
      description: `Plan visibility has been updated.`,
    })
  }

  const handleTogglePopular = (planId: string) => {
    setPlans(
      plans.map((plan) =>
        plan.id === planId ? { ...plan, popular: !plan.popular } : plan.popular ? { ...plan, popular: false } : plan,
      ),
    )

    toast({
      title: "Popular plan updated",
      description: `Popular plan badge has been updated.`,
    })
  }

  const handleEditPlan = (plan: HomeShieldPlan) => {
    setEditingPlan({ ...plan })
    setIsDialogOpen(true)
  }

  const handleAddPlan = () => {
    setEditingPlan({
      id: `plan-${Date.now()}`,
      name: "New Plan",
      price: 0,
      currency: "USD",
      interval: "month",
      description: "",
      features: [],
      active: false,
    })
    setIsDialogOpen(true)
  }

  const handleDeletePlan = (planId: string) => {
    setPlans(plans.filter((plan) => plan.id !== planId))

    toast({
      title: "Plan deleted",
      description: `The plan has been deleted.`,
    })
  }

  const handleSavePlan = () => {
    if (!editingPlan) return

    if (plans.some((plan) => plan.id === editingPlan.id)) {
      setPlans(plans.map((plan) => (plan.id === editingPlan.id ? editingPlan : plan)))
    } else {
      setPlans([...plans, editingPlan])
    }

    setIsDialogOpen(false)
    setEditingPlan(null)

    toast({
      title: "Plan saved",
      description: `The plan has been saved successfully.`,
    })
  }

  const handleAddFeature = () => {
    if (!newFeature.trim() || !editingPlan) return

    setEditingPlan({
      ...editingPlan,
      features: [...editingPlan.features, newFeature],
    })

    setNewFeature("")
  }

  const handleRemoveFeature = (index: number) => {
    if (!editingPlan) return

    setEditingPlan({
      ...editingPlan,
      features: editingPlan.features.filter((_, i) => i !== index),
    })
  }

  return (
    <DashboardLayout role="admin">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">HomeShield Plans</h1>
        <p className="text-muted-foreground">Manage your HomeShield protection plans</p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>Configure and manage your HomeShield plans</CardDescription>
          </div>
          <Button onClick={handleAddPlan}>
            <Plus className="mr-2 h-4 w-4" />
            Add Plan
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Features</TableHead>
                <TableHead>Popular</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="font-medium">{plan.name}</TableCell>
                  <TableCell>
                    ${plan.price}/{plan.interval}
                  </TableCell>
                  <TableCell>{plan.features.length} features</TableCell>
                  <TableCell>
                    <Switch checked={!!plan.popular} onCheckedChange={() => handleTogglePopular(plan.id)} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={plan.active} onCheckedChange={() => handleToggleActive(plan.id)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEditPlan(plan)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDeletePlan(plan.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingPlan?.id.startsWith("plan-") ? "Add New Plan" : "Edit Plan"}</DialogTitle>
            <DialogDescription>Configure the details and features of your HomeShield plan.</DialogDescription>
          </DialogHeader>

          {editingPlan && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Plan Name</Label>
                  <Input
                    id="name"
                    value={editingPlan.name}
                    onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <div className="flex items-center">
                    <Input
                      id="price"
                      type="number"
                      min="0"
                      step="0.01"
                      value={editingPlan.price}
                      onChange={(e) => setEditingPlan({ ...editingPlan, price: Number.parseFloat(e.target.value) })}
                    />
                    <span className="mx-2">/</span>
                    <select
                      value={editingPlan.interval}
                      onChange={(e) => setEditingPlan({ ...editingPlan, interval: e.target.value })}
                      className="h-10 rounded-md border border-input bg-background px-3"
                    >
                      <option value="month">month</option>
                      <option value="year">year</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingPlan.description}
                  onChange={(e) => setEditingPlan({ ...editingPlan, description: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Features</Label>
                <div className="border rounded-md p-4">
                  <div className="space-y-2">
                    {editingPlan.features.map((feature, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Check className="h-4 w-4 text-green-500 mr-2" />
                          <span>{feature}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveFeature(index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}

                    <div className="flex items-center gap-2 mt-4">
                      <Input
                        placeholder="Add a new feature"
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            handleAddFeature()
                          }
                        }}
                      />
                      <Button onClick={handleAddFeature}>Add</Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="popular"
                    checked={!!editingPlan.popular}
                    onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, popular: checked })}
                  />
                  <Label htmlFor="popular">Mark as Popular</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={editingPlan.active}
                    onCheckedChange={(checked) => setEditingPlan({ ...editingPlan, active: checked })}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePlan}>
              <Save className="mr-2 h-4 w-4" />
              Save Plan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
