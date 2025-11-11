"use client"

import { Header } from "@/components/header"
import { LegalChatbot } from "@/components/legal-chatbot"

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 flex flex-col overflow-hidden">
        <LegalChatbot />
      </div>
    </div>
  )
}
