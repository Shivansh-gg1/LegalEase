// app/dashboard/page.tsx
"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { DocumentUpload } from "@/components/document-upload"
import { DocumentHistory } from "@/components/document-history"

type TranslationResult = {
  original: string
  hindi: string
  tamil: string
  fileName?: string
  createdAt: string
}

export default function DashboardPage() {
  const [latestDoc, setLatestDoc] = useState<TranslationResult | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Document Analysis
          </h1>
          <p className="text-muted-foreground">
            Upload legal documents for AI-powered analysis and translation to Hindi & Tamil
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DocumentUpload
              onUploadComplete={(result) => {
                setLatestDoc({
                  ...result,
                  createdAt: new Date().toISOString(),
                })
              }}
            />
          </div>

          <div className="space-y-4">
            {/* You can keep your existing DocumentHistory if it’s already wired to a DB */}
            <DocumentHistory />

            {latestDoc && (
              <div className="border rounded-lg p-4 bg-card shadow-sm">
                <h2 className="text-lg font-semibold mb-2">
                  Latest Translation
                </h2>
                {latestDoc.fileName && (
                  <p className="text-xs text-muted-foreground mb-2">
                    {latestDoc.fileName}
                  </p>
                )}

                <div className="space-y-3 max-h-[400px] overflow-y-auto text-sm">
                  <div>
                    <h3 className="font-medium mb-1">Hindi</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {latestDoc.hindi}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Tamil</h3>
                    <p className="text-muted-foreground whitespace-pre-wrap">
                      {latestDoc.tamil}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
