import Link from "next/link"
import { Scale } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Scale className="h-5 w-5" />
              </div>
              <span className="font-bold text-foreground">LegalEase</span>
            </div>
            <p className="text-sm text-muted-foreground">Making legal justice accessible to every Indian citizen</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Integrations
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Careers
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 LegalEase. All rights reserved.</p>
          <div className="flex gap-6 mt-4 sm:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              Twitter
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              LinkedIn
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition">
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
