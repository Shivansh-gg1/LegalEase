"use client"

import { Header } from "@/components/header"
import { MediationBooking } from "@/components/mediation-booking"

export default function MediationPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Digital Mediation Services</h1>
          <p className="text-muted-foreground">
            Schedule e-mediation sessions with certified mediators to resolve disputes amicably
          </p>
        </div>
        <MediationBooking />
      </main>
    </div>
  )
}
