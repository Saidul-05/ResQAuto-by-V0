"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, X, FileText, Image, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FileUploaderProps {
  accept?: string
  maxSize?: number
  onFileSelect: (file: File | null) => void
  currentFile: File | null
}

export function FileUploader({ accept, maxSize = 5 * 1024 * 1024, onFileSelect, currentFile }: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
      validateAndSetFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0])
    }
  }

  const validateAndSetFile = (file: File) => {
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

    onFileSelect(file)
  }

  const handleRemoveFile = () => {
    onFileSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getFileIcon = () => {
    if (!currentFile) return <Upload className="h-8 w-8 text-muted-foreground" />

    if (currentFile.type.startsWith("image/")) {
      return <Image className="h-8 w-8 text-blue-500" />
    } else if (currentFile.type === "application/pdf") {
      return <FileText className="h-8 w-8 text-red-500" />
    } else {
      return <FileText className="h-8 w-8 text-gray-500" />
    }
  }

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          currentFile ? "bg-muted/50" : "",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <input type="file" ref={fileInputRef} className="hidden" accept={accept} onChange={handleFileChange} />

        <div className="flex flex-col items-center gap-2">
          {getFileIcon()}

          {currentFile ? (
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-sm font-medium">
                <Check className="h-4 w-4 text-green-500" />
                <span>File selected</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-center">
                {currentFile.name} ({(currentFile.size / 1024).toFixed(1)} KB)
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-sm font-medium">Drag & drop or click to upload</p>
              <p className="text-xs text-muted-foreground mt-1">
                {accept ? `Accepts ${accept.replace(/,/g, ", ")}` : "Any file type"}
                {maxSize && ` up to ${maxSize / (1024 * 1024)}MB`}
              </p>
            </div>
          )}
        </div>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {currentFile && (
        <div className="flex justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation()
              handleRemoveFile()
            }}
            className="text-xs"
          >
            <X className="h-3 w-3 mr-1" />
            Remove
          </Button>
        </div>
      )}
    </div>
  )
}
