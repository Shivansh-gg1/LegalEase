"use client"

import type React from "react"

import { useState } from "react"
import { Upload, FileText, X, CheckCircle, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface UploadedFile {
  id: string
  name: string
  size: number
  type: string
  uploadedAt: Date
  status: "uploading" | "processing" | "complete" | "error"
  progress: number
}

export function DocumentUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const droppedFiles = e.dataTransfer.files
    if (droppedFiles) {
      handleFiles(droppedFiles)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }

  const handleFiles = (fileList: FileList) => {
    const newFiles: UploadedFile[] = []

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]

      // Validate file type
      if (
        ![
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].includes(file.type)
      ) {
        continue
      }

      const uploadedFile: UploadedFile = {
        id: `${Date.now()}-${i}`,
        name: file.name,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        status: "uploading",
        progress: 0,
      }

      newFiles.push(uploadedFile)

      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += Math.random() * 30
        if (progress >= 100) {
          progress = 100
          clearInterval(interval)
          setFiles((prev) =>
            prev.map((f) => (f.id === uploadedFile.id ? { ...f, status: "processing", progress: 100 } : f)),
          )
          // Simulate processing
          setTimeout(() => {
            setFiles((prev) => prev.map((f) => (f.id === uploadedFile.id ? { ...f, status: "complete" } : f)))
          }, 1500)
        } else {
          setFiles((prev) => prev.map((f) => (f.id === uploadedFile.id ? { ...f, progress } : f)))
        }
      }, 300)
    }

    setFiles((prev) => [...prev, ...newFiles])
  }

  const removeFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  const getStatusIcon = (status: UploadedFile["status"]) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-5 w-5 text-accent" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-destructive" />
      default:
        return <FileText className="h-5 w-5 text-muted-foreground" />
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i]
  }

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Upload Documents</CardTitle>
        <CardDescription>Upload PDF or Word documents for legal analysis (Max 50 MB)</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Drop Zone */}
        <div
          className={`relative rounded-lg border-2 border-dashed transition-colors p-8 text-center cursor-pointer ${
            dragActive ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            multiple
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />

          <div className="flex flex-col items-center justify-center">
            <div className="h-12 w-12 bg-accent/20 rounded-lg flex items-center justify-center mb-3">
              <Upload className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-1">Drag and drop your files</h3>
            <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>
            <Button size="sm" variant="outline">
              Browse Files
            </Button>
          </div>
        </div>

        {/* Uploaded Files List */}
        {files.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-foreground text-sm">Uploaded Files</h4>
            <div className="space-y-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="p-4 rounded-lg border border-border bg-muted/30 hover:border-accent/50 transition"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3 flex-1">
                      {getStatusIcon(file.status)}
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-foreground text-sm truncate">{file.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatFileSize(file.size)} • {file.uploadedAt.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground transition"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Progress Bar */}
                  {file.status === "uploading" || file.status === "processing" ? (
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-accent transition-all duration-300"
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                  ) : (
                    file.status === "complete" && (
                      <Button size="sm" variant="outline" className="w-full text-xs bg-transparent">
                        View Summary
                      </Button>
                    )
                  )}

                  {/* Status Text */}
                  <p className="text-xs text-muted-foreground mt-2">
                    {file.status === "uploading" && `Uploading... ${Math.round(file.progress)}%`}
                    {file.status === "processing" && "Processing document..."}
                    {file.status === "complete" && "Ready for analysis"}
                    {file.status === "error" && "Upload failed"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Supported Formats */}
        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
          <p className="text-sm font-medium text-foreground mb-2">Supported Formats</p>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• PDF documents (judgments, case laws, contracts)</li>
            <li>• Microsoft Word documents (.docx, .doc)</li>
            <li>• Maximum file size: 50 MB</li>
            <li>• Secure encryption & privacy protected</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
