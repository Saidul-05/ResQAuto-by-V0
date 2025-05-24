"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, ImageIcon, Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

interface FileUploaderBlobProps {
  accept?: string
  maxSize?: number
  onFileUpload: (url: string, file: File) => void
  currentFileUrl?: string
  className?: string
  buttonText?: string
}

export function FileUploaderBlob({
  accept = "image/*",
  maxSize = 5 * 1024 * 1024, // 5MB default
  onFileUpload,
  currentFileUrl,
  className,
  buttonText = "Upload File",
}: FileUploaderBlobProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndUploadFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndUploadFile(e.target.files[0])
    }
  }

  const validateAndUploadFile = async (file: File) => {
    setError(null)

    // Check file type if accept is specified
    if (accept) {
      const acceptedTypes = accept.split(",")
      const fileType = file.type
      const fileExtension = `.${file.name.split(".").pop()}`

      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          // Extension check
          return fileExtension.toLowerCase() === type.toLowerCase()
        } else if (type.includes("*")) {
          // Wildcard check (e.g., "image/*")
          return fileType.startsWith(type.split("*")[0])
        } else {
          // Exact match
          return fileType === type
        }
      })

      if (!isAccepted) {
        setError(`File type not accepted. Please upload ${accept.replace(/,/g, " or ")}`)
        return
      }
    }

    // Check file size
    if (file.size > maxSize) {
      setError(`File is too large. Maximum size is ${maxSize / (1024 * 1024)}MB`)
      return
    }

    // Upload file to Vercel Blob
    try {
      setIsUploading(true)
      setUploadProgress(10)

      // Create a FormData object
      const formData = new FormData()
      formData.append("file", file)

      // Simulate progress (in a real app, you might use upload progress events)
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return prev
          }
          return prev + 10
        })
      }, 300)

      // Upload to Vercel Blob API endpoint
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setUploadProgress(100)

      if (!response.ok) {
        const error = await response.text()
        throw new Error(error || "Failed to upload file")
      }

      const { url } = await response.json()

      // Call the callback with the URL
      onFileUpload(url, file)

      toast({
        title: "File uploaded successfully",
        description: "Your file has been uploaded and saved.",
      })
    } catch (error) {
      console.error("Upload error:", error)
      setError("Failed to upload file. Please try again.")
      toast({
        title: "Upload failed",
        description: "There was a problem uploading your file.",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const getFileIcon = () => {
    if (!currentFileUrl) return <Upload className="h-8 w-8 text-muted-foreground" />

    if (currentFileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      return <ImageIcon className="h-8 w-8 text-blue-500" />
    } else if (currentFileUrl.match(/\.(pdf)$/i)) {
      return <FileText className="h-8 w-8 text-red-500" />
    } else {
      return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          currentFileUrl ? "bg-muted/50" : "",
          isUploading ? "pointer-events-none" : "hover:bg-muted/50",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept={accept} onChange={handleFileChange} />

        <div className="flex flex-col items-center gap-2">
          {isUploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <div className="w-48 h-2 bg-muted-foreground/20 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300 ease-in-out"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
              <p className="text-sm text-muted-foreground">Uploading... {uploadProgress}%</p>
            </div>
          ) : currentFileUrl ? (
            <div className="flex flex-col items-center">
              {currentFileUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? (
                <div className="relative w-24 h-24 mb-2">
                  <img
                    src={currentFileUrl || "/placeholder.svg"}
                    alt="Uploaded file"
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>
              ) : (
                getFileIcon()
              )}
              <div className="flex items-center gap-1 text-sm font-medium">
                <Check className="h-4 w-4 text-green-500" />
                <span>File uploaded</span>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="mt-2 h-8 text-xs"
                onClick={(e) => {
                  e.stopPropagation()
                  if (fileInputRef.current) {
                    fileInputRef.current.click()
                  }
                }}
              >
                Replace file
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <div className="mb-2">{getFileIcon()}</div>
              <p className="text-sm font-medium">{buttonText}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Drag & drop or click to upload
                <br />
                {accept ? `Accepts ${accept.replace(/,/g, ", ")}` : "Any file type"}
                {maxSize && ` up to ${maxSize / (1024 * 1024)}MB`}
              </p>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}
