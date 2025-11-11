"use client"

import { Header } from "@/components/header"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <AdminDashboard />
    </div>
  )
}
