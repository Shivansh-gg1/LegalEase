"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Scale } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Scale className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-foreground">LegalEase</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`text-sm transition ${isActive("/") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className={`text-sm transition ${isActive("/dashboard") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              Dashboard
            </Link>
            <Link
              href="/lawyers"
              className={`text-sm transition ${isActive("/lawyers") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              Lawyers
            </Link>
            <Link
              href="/chat"
              className={`text-sm transition ${isActive("/chat") ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"}`}
            >
              Legal AI
            </Link>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-accent hover:bg-accent/90">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-3">
              <Link href="/" className="px-4 py-2 text-sm hover:bg-muted rounded">
                Home
              </Link>
              <Link href="/dashboard" className="px-4 py-2 text-sm hover:bg-muted rounded">
                Dashboard
              </Link>
              <Link href="/lawyers" className="px-4 py-2 text-sm hover:bg-muted rounded">
                Lawyers
              </Link>
              <Link href="/chat" className="px-4 py-2 text-sm hover:bg-muted rounded">
                Legal AI
              </Link>
              <div className="flex gap-2 px-4 pt-2">
                <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                  Sign In
                </Button>
                <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90">
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
