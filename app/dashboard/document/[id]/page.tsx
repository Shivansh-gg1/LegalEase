import { Header } from "@/components/header"
import { DocumentViewer } from "@/components/document-viewer"

export default function DocumentPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <DocumentViewer documentId={params.id} />
      </main>
    </div>
  )
}
