import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Users, MessageSquare, Calendar, Zap, Lock } from "lucide-react"

const features = [
  {
    icon: FileText,
    title: "Document Upload & Analysis",
    description: "Upload legal documents and get instant AI-powered summaries, extracting key clauses and insights",
  },
  {
    icon: Zap,
    title: "Legal Summarization",
    description: "Complex legal text simplified. Side-by-side original and summary view for easy comprehension",
  },
  {
    icon: MessageSquare,
    title: "AI Legal Chatbot",
    description: "Ask legal questions and get answers with references to Indian law (IPC, CPC, Bare Acts)",
  },
  {
    icon: Users,
    title: "Verified Lawyer Directory",
    description: "Search and connect with Bar Council verified lawyers with verified credentials and specializations",
  },
  {
    icon: Calendar,
    title: "Digital Mediation Booking",
    description: "Schedule e-mediation calls with professionals through an integrated calendar system",
  },
  {
    icon: Lock,
    title: "Privacy & Security",
    description: "Blockchain-verified documents with end-to-end encryption and user consent management",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-28 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Comprehensive Legal Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to navigate the Indian legal system with confidence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card key={index} className="border-border hover:border-accent/50 transition bg-background">
                <CardHeader>
                  <div className="h-12 w-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
