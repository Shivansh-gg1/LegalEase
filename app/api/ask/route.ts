// app/api/ask/route.ts
import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

export const runtime = "nodejs" // groq-sdk needs Node runtime

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

type ChatMessage = {
  role: "user" | "assistant"
  content: string
}

export async function POST(req: NextRequest) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: "GROQ_API_KEY is not set on the server." },
        { status: 500 },
      )
    }

    const body = await req.json()
    const messages = body.messages as ChatMessage[] | undefined

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Request body must contain a non-empty 'messages' array." },
        { status: 400 },
      )
    }

    // Build messages for Groq
    const groqMessages = [
      {
        role: "system" as const,
        content:
          "You are 'LegalEase AI', an educational assistant that explains Indian law in simple language. " +
          "You can talk about IPC, CrPC, CPC, consumer protection, labour laws, etc. " +
          "You are NOT a lawyer and do NOT give personalised legal advice. " +
          "Always encourage the user to consult a qualified advocate for real cases.",
      },
      ...messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    ]

    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant", // or any other Groq model you prefer
      messages: groqMessages,
      temperature: 0.3,
      max_tokens: 800,
    })

    const answer = completion.choices[0]?.message?.content?.trim()

    if (!answer) {
      return NextResponse.json(
        { error: "No response from Groq model." },
        { status: 500 },
      )
    }

    // You can also generate 'sources' here if you later add RAG / citations
    return NextResponse.json({
      message: answer,
      // sources: [] // keep for future if you want
    })
  } catch (error: any) {
    console.error("Groq API error:", error)
    return NextResponse.json(
      { error: "Something went wrong while generating the answer." },
      { status: 500 },
    )
  }
}
