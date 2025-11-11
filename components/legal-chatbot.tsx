"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Sparkles, BookOpen, Scale, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  sources?: string[]
  timestamp: Date
}

const SUGGESTED_QUESTIONS = [
  {
    icon: Scale,
    question: "What is the definition of 'mens rea' under IPC?",
    category: "Criminal Law",
  },
  {
    icon: FileText,
    question: "How to file a consumer complaint in India?",
    category: "Consumer Protection",
  },
  {
    icon: BookOpen,
    question: "Explain the concept of bail under CrPC",
    category: "Criminal Procedure",
  },
  {
    icon: Scale,
    question: "What are my rights as an employee under labor law?",
    category: "Employment Law",
  },
]

export function LegalChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Namaste! I am your AI legal assistant. I can help you understand Indian legal concepts, explain laws like IPC, CPC, and labor laws, and provide guidance on legal procedures. Ask me anything about Indian law!",
      timestamp: new Date(),
    },
  ])

  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text?: string) => {
    const messageText = text || input.trim()
    if (!messageText) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // Simulate AI response with sources
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateAIResponse(messageText),
        sources: ["IPC Section 41", "CrPC Section 170", "Landmark Case: Kesavananda Bharati v. State of Kerala"],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
    }, 1200)

    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  const generateAIResponse = (question: string): string => {
    const responses: { [key: string]: string } = {
      mens_rea: `'Mens rea' is a Latin term meaning 'guilty mind'. Under the Indian Penal Code (IPC), it refers to the criminal intent or mental element required to constitute a crime. Different crimes have different requirements:

- Specific Intent Crimes: Require proof of a specific intention (e.g., theft requires intent to permanently deprive)
- General Intent Crimes: Require proof that the act was intentional or reckless
- Strict Liability Crimes: Don't require any mens rea

The concept is fundamental to criminal law as it distinguishes between criminal and civil liability.`,

      consumer_complaint: `To file a consumer complaint in India, follow these steps:

1. **Gather Documentation**: Collect the product/service receipt, warranty papers, and photographs of defects
2. **Send Notice**: Issue a notice to the manufacturer/service provider under Section 4A of the Consumer Protection Act
3. **File Complaint**: If unresolved, file complaint before District Consumer Commission on Form I
4. **Submit Evidence**: Include supporting documents with the complaint
5. **Court Hearing**: Attend the hearing and present your case
6. **Remedy**: If successful, you may get compensation for defective product/service

Complaints must be filed within 2 years of the cause of action.`,

      bail: `Bail under CrPC is a temporary release from custody pending trial. Key points:

- **Types**: Regular bail (after arrest) and anticipatory bail (before arrest)
- **Conditions**: Court may impose conditions like reporting to police
- **Grounds for Denial**: Flight risk, danger to witnesses, or severity of offense
- **Right to Bail**: No fundamental right to bail; it's discretionary
- **Appeal**: Bail orders can be appealed to higher courts
- **Sections**: CrPC Section 436-450 governs bail procedure`,

      employee_rights: `As an employee in India, your key rights include:

- **Minimum Wages**: Right to receive minimum wage as per state norms
- **Working Hours**: Maximum 8 hours per day, 48 hours per week
- **Leave**: Earned leave, sick leave, and casual leave as per rules
- **Safety**: Right to safe and healthy working conditions
- **No Discrimination**: Protection against discrimination based on caste, religion, gender
- **Statutory Benefits**: PF, Gratuity, ESI as applicable
- **Grievance Redressal**: Right to file complaints with labor commissioner`,
    }

    // Try to match question with responses
    const lowerQuestion = question.toLowerCase()
    if (lowerQuestion.includes("mens rea")) return responses.mens_rea
    if (lowerQuestion.includes("consumer")) return responses.consumer_complaint
    if (lowerQuestion.includes("bail")) return responses.bail
    if (lowerQuestion.includes("employee") || lowerQuestion.includes("rights")) return responses.employee_rights

    const messageText = question // Declare messageText variable here
    return `Based on Indian law and legal principles: ${messageText}\n\nThis is a complex legal matter. For accurate advice specific to your situation, please consult with a qualified lawyer through our verified lawyer directory. If you need more specific information, feel free to ask follow-up questions.`
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xl sm:max-w-2xl lg:max-w-3xl ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-lg rounded-tr-none"
                    : "bg-card border border-border rounded-lg rounded-tl-none"
                } p-4 space-y-3`}
              >
                <p className="text-sm sm:text-base leading-relaxed whitespace-pre-wrap">{message.content}</p>

                {message.sources && message.sources.length > 0 && (
                  <div className="pt-3 border-t border-current/20 space-y-2">
                    <p
                      className={`text-xs font-medium ${message.role === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                    >
                      Sources Referenced:
                    </p>
                    <div className="space-y-1">
                      {message.sources.map((source, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-2 text-xs ${
                            message.role === "user" ? "text-primary-foreground/80" : "text-foreground"
                          }`}
                        >
                          <span className="text-accent">•</span>
                          <span>{source}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border rounded-lg rounded-tl-none p-4">
                <div className="flex gap-2">
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggested Questions (shown only when no user messages) */}
      {messages.length === 1 && !isLoading && (
        <div className="px-4 sm:px-6 py-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <p className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Suggested Questions
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {SUGGESTED_QUESTIONS.map((item, i) => {
                const Icon = item.icon
                return (
                  <button
                    key={i}
                    onClick={() => handleSendMessage(item.question)}
                    className="text-left p-4 rounded-lg border border-border hover:border-accent/50 bg-card hover:bg-accent/5 transition group"
                  >
                    <div className="flex items-start gap-3">
                      <Icon className="h-4 w-4 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-sm font-medium text-foreground group-hover:text-accent transition">
                          {item.question}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{item.category}</p>
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="border-t border-border bg-background p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-3">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
              placeholder="Ask a legal question..."
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
            />
            <Button
              onClick={() => handleSendMessage()}
              disabled={!input.trim() || isLoading}
              className="bg-accent hover:bg-accent/90 text-accent-foreground px-4"
            >
              <Send className="h-4 w-4" />
              <span className="hidden sm:inline ml-2">Send</span>
            </Button>
          </div>

          <p className="text-xs text-muted-foreground mt-3">
            LegalEase AI provides information for educational purposes. For specific legal advice, consult a verified
            lawyer.
          </p>
        </div>
      </div>
    </div>
  )
}
