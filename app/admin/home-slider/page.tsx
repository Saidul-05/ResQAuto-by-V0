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
import { DragDropContext, Droppable, Draggable, type DropResult } from "@hello-pangea/dnd"
import { Edit, Eye, Trash2, GripVertical, Plus, Save, ImageIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import type { SlideItem } from "@/components/home-slider"

// Sample data
const initialSlides: SlideItem[] = [
  {
    id: "slide1",
    title: "Road Side Assistance You Can Trust",
    description:
      "We're here to help whenever you need us. 24/7 emergency service with fast response times across the nation.",
    imageUrl: "/placeholder.svg?height=1080&width=1920",
    buttonText: "Request Emergency Assistance",
    buttonLink: "/emergency",
    buttonVariant: "destructive",
  },
  {
    id: "slide2",
    title: "Join Our Premium Membership",
    description:
      "Get priority service, exclusive benefits, and peace of mind on the road with our premium membership plans.",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Premium+Membership",
    buttonText: "Explore Membership Options",
    buttonLink: "/membership",
    buttonVariant: "default",
  },
  {
    id: "slide3",
    title: "Professional Mechanics at Your Service",
    description:
      "Our certified mechanics are equipped with the latest tools and technology to get you back on the road quickly.",
    imageUrl: "/placeholder.svg?height=1080&width=1920&text=Professional+Service",
    buttonText: "Meet Our Team",
    buttonLink: "/about",
    buttonVariant: "outline",
  },
]

export default function HomeSliderAdmin() {
  const [slides, setSlides] = useState<SlideItem[]>(initialSlides)
  const [editingSlide, setEditingSlide] = useState<SlideItem | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [sliderEnabled, setSliderEnabled] = useState(true)
  const { toast } = useToast()

  const handleAddSlide = () => {
    setEditingSlide({
      id: `slide-${Date.now()}`,
      title: "New Slide",
      description: "Enter slide description here",
      imageUrl: "/placeholder.svg?height=1080&width=1920&text=New+Slide",
      buttonText: "Click Here",
      buttonLink: "/",
      buttonVariant: "default",
    })
    setIsDialogOpen(true)
  }

  const handleEditSlide = (slide: SlideItem) => {
    setEditingSlide({ ...slide })
    setIsDialogOpen(true)
  }

  const handleDeleteSlide = (id: string) => {
    setSlides(slides.filter((slide) => slide.id !== id))

    toast({
      title: "Slide deleted",
      description: "The slide has been removed from the homepage slider.",
    })
  }

  const handleSaveSlide = () => {
    if (!editingSlide) return

    if (slides.some((slide) => slide.id === editingSlide.id)) {
      setSlides(slides.map((slide) => (slide.id === editingSlide.id ? editingSlide : slide)))
    } else {
      setSlides([...slides, editingSlide])
    }

    setIsDialogOpen(false)
    setEditingSlide(null)

    toast({
      title: "Slide saved",
      description: "Your changes have been saved successfully.",
    })
  }

  const handlePreviewSlide = (slide: SlideItem) => {
    setEditingSlide(slide)
    setIsPreviewOpen(true)
  }

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const items = Array.from(slides)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setSlides(items)

    toast({
      title: "Slides reordered",
      description: "The order of slides has been updated.",
    })
  }

  const handleToggleSlider = () => {
    setSliderEnabled(!sliderEnabled)

    toast({
      title: sliderEnabled ? "Slider disabled" : "Slider enabled",
      description: sliderEnabled ? "The homepage slider has been disabled." : "The homepage slider has been enabled.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Homepage Slider</h1>
          <p className="text-muted-foreground">Manage the slides that appear on the homepage</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch id="slider-toggle" checked={sliderEnabled} onCheckedChange={handleToggleSlider} />
            <Label htmlFor="slider-toggle">Enable Slider</Label>
          </div>
          <Button onClick={handleAddSlide}>
            <Plus className="mr-2 h-4 w-4" />
            Add New Slide
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Manage Slides</CardTitle>
          <CardDescription>
            Drag and drop to reorder slides. The first slide will be shown first on the homepage.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {slides.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No slides found. Add a new slide to get started.</p>
            </div>
          ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="slides">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead style={{ width: 50 }}></TableHead>
                          <TableHead>Title</TableHead>
                          <TableHead>Button</TableHead>
                          <TableHead>Image</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {slides.map((slide, index) => (
                          <Draggable key={slide.id} draggableId={slide.id} index={index}>
                            {(provided) => (
                              <TableRow ref={provided.innerRef} {...provided.draggableProps}>
                                <TableCell>
                                  <div {...provided.dragHandleProps} className="cursor-grab">
                                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                                  </div>
                                </TableCell>
                                <TableCell className="font-medium">{slide.title}</TableCell>
                                <TableCell>
                                  <span
                                    className={`px-2 py-1 rounded-full text-xs bg-${slide.buttonVariant} text-${slide.buttonVariant}-foreground`}
                                  >
                                    {slide.buttonText}
                                  </span>
                                </TableCell>
                                <TableCell>
                                  <div className="h-10 w-20 relative rounded overflow-hidden">
                                    <img
                                      src={slide.imageUrl || "/placeholder.svg"}
                                      alt={slide.title}
                                      className="object-cover w-full h-full"
                                    />
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex space-x-2">
                                    <Button variant="ghost" size="icon" onClick={() => handlePreviewSlide(slide)}>
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleEditSlide(slide)}>
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" onClick={() => handleDeleteSlide(slide.id)}>
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </CardContent>
      </Card>

      {/* Edit Slide Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingSlide?.id.startsWith("slide-") ? "Add New Slide" : "Edit Slide"}</DialogTitle>
            <DialogDescription>Configure the content and appearance of this slide.</DialogDescription>
          </DialogHeader>

          {editingSlide && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Slide Title</Label>
                <Input
                  id="title"
                  value={editingSlide.title}
                  onChange={(e) => setEditingSlide({ ...editingSlide, title: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={editingSlide.description}
                  onChange={(e) => setEditingSlide({ ...editingSlide, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="imageUrl">Image URL</Label>
                <div className="flex gap-2">
                  <Input
                    id="imageUrl"
                    value={editingSlide.imageUrl}
                    onChange={(e) => setEditingSlide({ ...editingSlide, imageUrl: e.target.value })}
                  />
                  <Button variant="outline">
                    <ImageIcon className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Recommended size: 1920x1080 pixels</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buttonText">Button Text</Label>
                  <Input
                    id="buttonText"
                    value={editingSlide.buttonText}
                    onChange={(e) => setEditingSlide({ ...editingSlide, buttonText: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buttonLink">Button Link</Label>
                  <Input
                    id="buttonLink"
                    value={editingSlide.buttonLink}
                    onChange={(e) => setEditingSlide({ ...editingSlide, buttonLink: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="buttonVariant">Button Style</Label>
                <Select
                  value={editingSlide.buttonVariant}
                  onValueChange={(value: any) => setEditingSlide({ ...editingSlide, buttonVariant: value })}
                >
                  <SelectTrigger id="buttonVariant">
                    <SelectValue placeholder="Select button style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="destructive">Destructive</SelectItem>
                    <SelectItem value="outline">Outline</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                    <SelectItem value="ghost">Ghost</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSlide}>
              <Save className="mr-2 h-4 w-4" />
              Save Slide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Slide Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Slide Preview</DialogTitle>
            <DialogDescription>Preview how this slide will appear on the homepage</DialogDescription>
          </DialogHeader>

          {editingSlide && (
            <div className="py-4">
              <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${editingSlide.imageUrl})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />

                {/* Content */}
                <div className="relative h-full flex items-center">
                  <div className="px-6">
                    <div className="max-w-xl space-y-4">
                      <h2 className="text-2xl md:text-3xl font-bold text-white">{editingSlide.title}</h2>
                      <p className="text-sm md:text-base text-white/90">{editingSlide.description}</p>
                      <div>
                        <Button
                          variant={editingSlide.buttonVariant as any}
                          className={
                            editingSlide.buttonVariant === "outline"
                              ? "bg-background/20 hover:bg-background/30 text-white border-white/20"
                              : ""
                          }
                        >
                          {editingSlide.buttonText}
                        </Button>
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
