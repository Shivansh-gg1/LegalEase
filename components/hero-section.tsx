import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background gradient blur */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-1/3 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl opacity-50" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-muted rounded-full">
            <Shield className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium text-muted-foreground">Trusted by Legal Professionals</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance">
            Access Legal Guidance with{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">AI Precision</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8 text-balance">
            Simplifying Indian legal services for citizens and professionals. Upload documents, get AI-powered
            summaries, find verified lawyers, and access justice.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Explore Features
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Feature cards preview */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-accent/50 transition">
            <div className="h-12 w-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Quick Document Analysis</h3>
            <p className="text-sm text-muted-foreground">
              Upload PDF or DOCX files and get instant AI-powered summaries and analysis
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-accent/50 transition">
            <div className="h-12 w-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Verified Professionals</h3>
            <p className="text-sm text-muted-foreground">
              Connect with Bar Council verified lawyers and legal experts in your area
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border bg-card/50 backdrop-blur hover:border-accent/50 transition">
            <div className="h-12 w-12 bg-accent/20 rounded-lg flex items-center justify-center mb-4">
              <ArrowRight className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">Multilingual Support</h3>
            <p className="text-sm text-muted-foreground">
              Get content in English, Hindi, and other Indian languages for accessibility
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
