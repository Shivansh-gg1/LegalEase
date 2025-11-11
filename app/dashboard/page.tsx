import { Header } from "@/components/header"
import { DocumentUpload } from "@/components/document-upload"
import { DocumentHistory } from "@/components/document-history"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Document Analysis</h1>
          <p className="text-muted-foreground">Upload legal documents for AI-powered analysis and summarization</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <DocumentUpload />
          </div>
          <div>
            <DocumentHistory />
          </div>
        </div>
      </main>
    </div>
  )
}
