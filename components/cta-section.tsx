import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-border bg-card p-8 sm:p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4 text-balance">
            Ready to Simplify Your Legal Journey?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-balance">
            Join thousands of citizens accessing legal guidance with confidence. Get started in minutes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 px-8">
              Start Free Trial
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
