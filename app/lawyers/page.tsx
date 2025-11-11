"use client"

import { Header } from "@/components/header"
import { LawyerDirectory } from "@/components/lawyer-directory"

export default function LawyersPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Find a Lawyer</h1>
          <p className="text-muted-foreground">
            Connect with verified legal professionals from the Bar Council of India
          </p>
        </div>
        <LawyerDirectory />
      </main>
    </div>
  )
}
