"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Edit, Eye, Trash2, Plus, Save, ImageIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AdItem } from "@/components/ads/ad-banner"

// Sample data
const initialAds: AdItem[] = [
  {
    id: "homepage-top-1",
    title: "Special Offer: 20% off Premium Membership",
    description: "Limited time offer. Sign up today!",
    imageUrl: "/placeholder.svg?height=60&width=468",
    linkUrl: "/membership",
    backgroundColor: "#f0f9ff",
    textColor: "#0369a1",
    position: "top",
    dismissible: true,
  },
  {
    id: "homepage-top-2",
    title: "Download Our Mobile App",
    description: "Get roadside assistance at your fingertips",
    imageUrl: "/placeholder.svg?height=60&width=468",
    linkUrl: "/download-app",
    backgroundColor: "#fef2f2",
    textColor: "#b91c1c",
    position: "top",
    dismissible: true,
  },
  {
    id: "sidebar-promo-1",
    title: "Need emergency assistance?",
    description: "Call our 24/7 hotline",
    imageUrl: "/placeholder.svg?height=250&width=300",
    linkUrl: "/emergency",
    backgroundColor: "#fef2f2",
    textColor: "#b91c1c",
    position: "sidebar",
    dismissible: true,
  },
  {
    id: "homepage-bottom-1",
    title: "New service areas available!",
    description: "We've expanded our coverage",
    imageUrl: "/placeholder.svg?height=90&width=728",
    linkUrl: "/service-areas",
    backgroundColor: "#f0fdf4",
    textColor: "#166534",
    position: "bottom",
    dismissible: true,
  },
]

export default function AdsManagement() {
  const [ads, setAds] = useState<AdItem[]>(initialAds)
  const [editingAd, setEditingAd] = useState<AdItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [adsEnabled, setAdsEnabled] = useState(true)
  const { toast } = useToast()

  const handleAddAd = () => {
    setEditingAd({
      id: `ad-${Date.now()}`,
      title: "New Advertisement",
      description: "Enter ad description here",
      imageUrl: "/placeholder.svg?height=250&width=300",
      linkUrl: "/",
      backgroundColor: "#ffffff",
      textColor: "#000000",
      position: "top",
      dismissible: true,
    })
    setIsDialogOpen(true)
  }

  const handleEditAd = (ad: AdItem) => {
    setEditingAd({ ...ad })
    setIsDialogOpen(true)
  }

  const handleDeleteAd = (id: string) => {
    setAds(ads.filter((ad) => ad.id !== id))

    toast({
      title: "Ad deleted",
      description: "The advertisement has been removed.",
    })
  }

  const handleSaveAd = () => {
    if (!editingAd) return

    if (ads.some((ad) => ad.id === editingAd.id)) {
      setAds(ads.map((ad) => (ad.id === editingAd.id ? editingAd : ad)))
    } else {
      setAds([...ads, editingAd])
    }

    setIsDialogOpen(false)
    setEditingAd(null)

    toast({
      title: "Ad saved",
      description: "Your changes have been saved successfully.",
    })
  }

  const handlePreviewAd = (ad: AdItem) => {
    setEditingAd(ad)
    setIsPreviewOpen(true)
  }

  const handleToggleAds = () => {
    setAdsEnabled(!adsEnabled)

    toast({
      title: adsEnabled ? "Ads disabled" : "Ads enabled",
      description: adsEnabled ? "All advertisements have been disabled." : "Advertisements have been enabled.",
    })
  }

  const getPositionDisplayName = (position: string) => {
    switch (position) {
      case "top":
        return "Top of Page"
      case "bottom":
        return "Bottom of Page"
      case "sidebar":
        return "Sidebar"
      default:
        return position
    }
  }

  // Filter ads by position
  const topAds = ads.filter((ad) => ad.position === "top")
  const bottomAds = ads.filter((ad) => ad.position === "bottom")
  const sidebarAds = ads.filter((ad) => ad.position === "sidebar")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Ads Management</h1>
          <p className="text-muted-foreground">Manage advertisements displayed on your website</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="ads-toggle" checked={adsEnabled} onCheckedChange={handleToggleAds} />
            <Label htmlFor="ads-toggle">Enable Ads</Label>
          </div>
          <Button onClick={handleAddAd}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Ad
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All Ads</TabsTrigger>
          <TabsTrigger value="top">Top Ads</TabsTrigger>
          <TabsTrigger value="bottom">Bottom Ads</TabsTrigger>
          <TabsTrigger value="sidebar">Sidebar Ads</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <CardTitle>All Advertisements</CardTitle>
              <CardDescription>Manage all ads across your website</CardDescription>
            </CardHeader>
            <CardContent>
              {ads.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No ads found. Add a new ad to get started.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Position</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Dismissible</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ads.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.title}</TableCell>
                        <TableCell>{getPositionDisplayName(ad.position)}</TableCell>
                        <TableCell className="truncate max-w-[200px]">{ad.linkUrl}</TableCell>
                        <TableCell>{ad.dismissible ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handlePreviewAd(ad)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditAd(ad)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteAd(ad.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="top">
          <Card>
            <CardHeader>
              <CardTitle>Top Ads</CardTitle>
              <CardDescription>Ads displayed at the top of pages</CardDescription>
            </CardHeader>
            <CardContent>
              {topAds.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No top ads found. Add a new ad to get started.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Dismissible</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topAds.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.title}</TableCell>
                        <TableCell className="truncate max-w-[200px]">{ad.linkUrl}</TableCell>
                        <TableCell>{ad.dismissible ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handlePreviewAd(ad)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditAd(ad)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteAd(ad.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bottom">
          <Card>
            <CardHeader>
              <CardTitle>Bottom Ads</CardTitle>
              <CardDescription>Ads displayed at the bottom of pages</CardDescription>
            </CardHeader>
            <CardContent>
              {bottomAds.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No bottom ads found. Add a new ad to get started.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Dismissible</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bottomAds.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.title}</TableCell>
                        <TableCell className="truncate max-w-[200px]">{ad.linkUrl}</TableCell>
                        <TableCell>{ad.dismissible ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handlePreviewAd(ad)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditAd(ad)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteAd(ad.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sidebar">
          <Card>
            <CardHeader>
              <CardTitle>Sidebar Ads</CardTitle>
              <CardDescription>Ads displayed in the sidebar</CardDescription>
            </CardHeader>
            <CardContent>
              {sidebarAds.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <p>No sidebar ads found. Add a new ad to get started.</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Link</TableHead>
                      <TableHead>Dismissible</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sidebarAds.map((ad) => (
                      <TableRow key={ad.id}>
                        <TableCell className="font-medium">{ad.title}</TableCell>
                        <TableCell className="truncate max-w-[200px]">{ad.linkUrl}</TableCell>
                        <TableCell>{ad.dismissible ? "Yes" : "No"}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="icon" onClick={() => handlePreviewAd(ad)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleEditAd(ad)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" onClick={() => handleDeleteAd(ad.id)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Ad Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingAd?.id.startsWith("ad-") ? "Add New Ad" : "Edit Ad"}</DialogTitle>
            <DialogDescription>Configure the content and appearance of this advertisement.</DialogDescription>
          </DialogHeader>

          {editingAd && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Ad Title</Label>
                <Input
                  id="title"
                  value={editingAd.title}
                  onChange={(e) => setEditingAd({ ...editingAd, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={editingAd.description || ""}
                  onChange={(e) => setEditingAd({ ...editingAd, description: e.target.value })}
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    value={editingAd.imageUrl}
                    onChange={(e) => setEditingAd({ ...editingAd, imageUrl: e.target.value })}
                  />
                  <Button variant="outline">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="linkUrl">Link URL</Label>
                <Input
                  id="linkUrl"
                  value={editingAd.linkUrl}
                  onChange={(e) => setEditingAd({ ...editingAd, linkUrl: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backgroundColor">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="backgroundColor"
                      value={editingAd.backgroundColor || "#ffffff"}
                      onChange={(e) => setEditingAd({ ...editingAd, backgroundColor: e.target.value })}
                    />
                    <input
                      type="color"
                      value={editingAd.backgroundColor || "#ffffff"}
                      onChange={(e) => setEditingAd({ ...editingAd, backgroundColor: e.target.value })}
                      className="h-10 w-10 rounded-md border border-input"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="textColor">Text Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="textColor"
                      value={editingAd.textColor || "#000000"}
                      onChange={(e) => setEditingAd({ ...editingAd, textColor: e.target.value })}
                    />
                    <input
                      type="color"
                      value={editingAd.textColor || "#000000"}
                      onChange={(e) => setEditingAd({ ...editingAd, textColor: e.target.value })}
                      className="h-10 w-10 rounded-md border border-input"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="position">Position</Label>
                <Select
                  value={editingAd.position}
                  onValueChange={(value: any) => setEditingAd({ ...editingAd, position: value })}
                >
                  <SelectTrigger id="position">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="top">Top of Page</SelectItem>
                    <SelectItem value="bottom">Bottom of Page</SelectItem>
                    <SelectItem value="sidebar">Sidebar</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="dismissible"
                  checked={editingAd.dismissible !== false}
                  onCheckedChange={(checked) => setEditingAd({ ...editingAd, dismissible: checked })}
                />
                <Label htmlFor="dismissible">Allow users to dismiss this ad</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveAd}>
              <Save className="mr-2 h-4 w-4" />
              Save Ad
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Ad Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Ad Preview</DialogTitle>
            <DialogDescription>Preview how this ad will appear on the website</DialogDescription>
          </DialogHeader>

          {editingAd && (
            <div className="py-4">
              <div className="mb-4 p-2 border rounded-md">
                <h3 className="text-sm font-medium mb-2">Ad Details:</h3>
                <p>
                  <strong>Title:</strong> {editingAd.title}
                </p>
                <p>
                  <strong>Position:</strong> {getPositionDisplayName(editingAd.position)}
                </p>
                <p>
                  <strong>Link:</strong> {editingAd.linkUrl}
                </p>
                <p>
                  <strong>Dismissible:</strong> {editingAd.dismissible !== false ? "Yes" : "No"}
                </p>
              </div>

              <div className="border rounded-md p-4">
                <h3 className="text-sm font-medium mb-2">Preview:</h3>
                <div
                  className="relative rounded-md overflow-hidden"
                  style={{ backgroundColor: editingAd.backgroundColor || "#ffffff" }}
                >
                  {editingAd.dismissible !== false && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-70 hover:opacity-100 z-10"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Dismiss</span>
                    </Button>
                  )}

                  <div className="p-4 flex items-center justify-center">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      <img
                        src={editingAd.imageUrl || "/placeholder.svg"}
                        alt={editingAd.title}
                        className="rounded-md max-h-[120px] w-auto"
                      />
                      <div className="text-center sm:text-left">
                        <h3 className="font-medium text-lg" style={{ color: editingAd.textColor || "#000000" }}>
                          {editingAd.title}
                        </h3>
                        {editingAd.description && (
                          <p
                            className="text-sm mt-1"
                            style={{ color: editingAd.textColor ? `${editingAd.textColor}99` : "#00000099" }}
                          >
                            {editingAd.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setIsPreviewOpen(false)}>Close Preview</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
