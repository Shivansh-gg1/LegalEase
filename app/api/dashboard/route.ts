// app/api/dashboard/route.ts
import { NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"
import pdfParse from "pdf-parse"   // ✅ correct

export const runtime = "nodejs"
export const maxDuration = 60

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

async function extractTextFromPDF(buffer: Buffer): Promise<string> {
  const data = await pdfParse(buffer)      // ✅ call the function directly
  return (data.text || "").trim()
}


async function translateWithGroq(
  text: string,
  language: "Hindi" | "Tamil"
) {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages: [
      {
        role: "system",
        content: `You are a professional legal translator.
Translate the document into ${language}.
Preserve section numbers, formatting, bullet points, and legal tone.`,
      },
      {
        role: "user",
        content: text,
      },
    ],
    temperature: 0.2,
  })

  return completion.choices[0]?.message?.content || ""
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get("file")

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const text = await extractTextFromPDF(buffer)

    if (!text) {
      return NextResponse.json(
        { error: "Could not extract text from PDF" },
        { status: 400 }
      )
    }

    const [hindi, tamil] = await Promise.all([
      translateWithGroq(text, "Hindi"),
      translateWithGroq(text, "Tamil"),
    ])

    return NextResponse.json({
      original: text,
      hindi,
      tamil,
    })
  } catch (err) {
    console.error("Error in /api/dashboard:", err)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
