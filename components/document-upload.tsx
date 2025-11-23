// components/document-upload.tsx
"use client"

import { useState } from "react"

type DocumentUploadProps = {
  onUploadComplete?: (result: {
    original: string
    hindi: string
    tamil: string
    fileName?: string
  }) => void
}

export function DocumentUpload({ onUploadComplete }: DocumentUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    if (selected.type !== "application/pdf") {
      setError("Please upload a PDF file.")
      setFile(null)
      return
    }

    setError(null)
    setFile(selected)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) {
      setError("Please select a PDF file.")
      return
    }

    try {
      setLoading(true)
      setError(null)

      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/dashboard", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || "Failed to process document")
      }

      const data = await res.json()

      onUploadComplete?.({
        original: data.original,
        hindi: data.hindi,
        tamil: data.tamil,
        fileName: file.name,
      })
    } catch (err: any) {
      console.error(err)
      setError(err.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border rounded-lg p-6 bg-card shadow-sm space-y-4"
    >
      <h2 className="text-xl font-semibold mb-2">
        Upload PDF for Translation
      </h2>
      <p className="text-sm text-muted-foreground mb-2">
        The document will be translated to Hindi and Tamil using AI.
      </p>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block w-full text-sm text-muted-foreground
        file:mr-4 file:py-2 file:px-4
        file:rounded-md file:border-0
        file:text-sm file:font-semibold
        file:bg-primary file:text-primary-foreground
        hover:file:opacity-90"
      />

      {error && (
        <p className="text-sm text-red-500">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading || !file}
        className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium
        bg-primary text-primary-foreground disabled:opacity-50"
      >
        {loading ? "Processing..." : "Upload & Translate"}
      </button>
    </form>
  )
}
