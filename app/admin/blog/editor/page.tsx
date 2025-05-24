"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, ArrowLeft, Save, Plus, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { FileUploaderBlob } from "@/components/ui/file-uploader-blob"

export default function BlogEditorPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [coverImage, setCoverImage] = useState<string | null>(null)
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCoverImageUpload = (url: string) => {
    setCoverImage(url)
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags((prev) => [...prev, tagInput.trim()])
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Validate form
      if (!formData.title || !formData.content || !formData.category) {
        toast({
          title: "Missing information",
          description: "Please fill in all required fields.",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // In a real app, you would send the form data, tags, and cover image to your backend
      console.log("Blog post:", { ...formData, tags, coverImage })

      toast({
        title: "Blog post published",
        description: "Your blog post has been published successfully.",
      })

      // Redirect to blog page
      router.push("/admin/blog")
    } catch (error) {
      console.error("Error publishing blog post:", error)
      toast({
        title: "Publication failed",
        description: "Failed to publish your blog post. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container max-w-5xl py-8">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog Management
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create New Blog Post</CardTitle>
          <CardDescription>Write and publish a new blog post</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">
                  Title <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter blog post title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  placeholder="Brief summary of the blog post"
                  value={formData.excerpt}
                  onChange={handleChange}
                  rows={2}
                />
                <p className="text-xs text-muted-foreground">
                  A short summary that appears in blog listings (max 160 characters)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleSelectChange("category", value)}
                    required
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="roadside-tips">Roadside Tips</SelectItem>
                      <SelectItem value="vehicle-maintenance">Vehicle Maintenance</SelectItem>
                      <SelectItem value="emergency-preparedness">Emergency Preparedness</SelectItem>
                      <SelectItem value="travel-safety">Travel Safety</SelectItem>
                      <SelectItem value="company-news">Company News</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <div className="flex gap-2">
                    <Input
                      id="tags"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Add a tag"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddTag()
                        }
                      }}
                    />
                    <Button type="button" onClick={handleAddTag} variant="outline">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  {tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {tags.map((tag) => (
                        <div
                          key={tag}
                          className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-sm flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="text-secondary-foreground/70 hover:text-secondary-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Cover Image</Label>
                <FileUploaderBlob
                  accept="image/*"
                  maxSize={10 * 1024 * 1024} // 10MB
                  onFileUpload={(url) => handleCoverImageUpload(url)}
                  currentFileUrl={coverImage || undefined}
                  buttonText="Upload Cover Image"
                />
                <p className="text-xs text-muted-foreground">Recommended size: 1200x630 pixels (16:9 ratio)</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">
                  Content <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="content"
                  name="content"
                  placeholder="Write your blog post content here..."
                  value={formData.content}
                  onChange={handleChange}
                  rows={15}
                  required
                />
                <p className="text-xs text-muted-foreground">You can use Markdown formatting for rich text</p>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Publish Blog Post
                </>
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => router.push("/admin/blog")} disabled={isLoading}>
            Cancel
          </Button>
          <Button variant="secondary" disabled={isLoading}>
            Save as Draft
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
