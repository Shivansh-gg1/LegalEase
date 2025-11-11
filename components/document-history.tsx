"use client"

import { FileText, Download, Trash2, Eye } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Document {
  id: string
  name: string
  uploadedAt: Date
  type: "judgment" | "contract" | "case-law" | "other"
  status: "processed" | "pending" | "failed"
}

const mockDocuments: Document[] = [
  {
    id: "1",
    name: "SC Judgment - Kesavananda Bharati Case",
    uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    type: "judgment",
    status: "processed",
  },
  {
    id: "2",
    name: "Employment Contract Draft",
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    type: "contract",
    status: "processed",
  },
  {
    id: "3",
    name: "IPC Section 498A Analysis",
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    type: "case-law",
    status: "processed",
  },
]

export function DocumentHistory() {
  return (
    <Card className="border-border h-full">
      <CardHeader>
        <CardTitle className="text-lg">Recent Documents</CardTitle>
        <CardDescription>Your document history</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {mockDocuments.map((doc) => (
          <div key={doc.id} className="p-3 rounded-lg border border-border hover:border-accent/50 transition group">
            <div className="flex items-start gap-3 mb-2">
              <div className="h-8 w-8 bg-accent/20 rounded flex items-center justify-center flex-shrink-0">
                <FileText className="h-4 w-4 text-accent" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-foreground text-sm truncate">{doc.name}</p>
                <p className="text-xs text-muted-foreground">{doc.uploadedAt.toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs flex-1">
                <Eye className="h-3 w-3 mr-1" />
                View
              </Button>
              <Button size="sm" variant="ghost" className="h-7 px-2">
                <Download className="h-3 w-3" />
              </Button>
              <Button size="sm" variant="ghost" className="h-7 px-2 hover:text-destructive">
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}

        <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
          View All Documents
        </Button>
      </CardContent>
    </Card>
  )
}
