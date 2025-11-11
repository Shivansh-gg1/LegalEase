"use client"

import { useState } from "react"
import { Copy, Download, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface DocumentViewerProps {
  documentId: string
}

const mockDocument = {
  id: "1",
  name: "SC Judgment - Kesavananda Bharati Case",
  originalText: `KESAVANANDA BHARATI v. STATE OF KERALA & ANOR., 1973 4 SCC 225

Decided on April 24, 1973

HELD:

1. The Constitution has a basic structure and the Parliament cannot alter the basic features of the Constitution.

2. The amending power under Article 368 is limited by the basic structure doctrine.

3. While the Parliament has the power to amend any part of the Constitution, this power is limited by what constitutes the basic features of the Constitution.

4. The doctrine preserves the integrity and character of the Constitution and ensures that constitutional amendments do not transform the fundamental nature of the document.

KEY PROVISIONS:

- Article 368: Power to amend the Constitution
- Article 13: Invalidity of laws inconsistent with the Constitution
- The preamble of the Constitution establishes the basic structure
- Judicial review is a basic feature that cannot be amended away

SIGNIFICANCE: This landmark judgment established the doctrine of basic structure of the Constitution, which has become a cornerstone of Indian constitutional law.`,

  summary: `This landmark Supreme Court judgment established that the Indian Constitution has a basic structure that cannot be amended. The court held that while Parliament has amendment powers under Article 368, these powers are limited. The basic features—including the supremacy of the Constitution, federal structure, separation of powers, and judicial review—cannot be altered through constitutional amendments. This doctrine ensures the Constitution maintains its fundamental character and integrity while allowing for legitimate amendments.`,

  keyPoints: [
    "Constitution has an inviolable basic structure",
    "Amendment power is limited by basic features",
    "Judicial review cannot be amended away",
    "Federal structure is protected",
    "Protects constitutional supremacy",
  ],

  applicableLaws: [
    "Article 368 - Amendment of Constitution",
    "Article 13 - Invalidity of laws",
    "Preamble of Constitution",
  ],
}

export function DocumentViewer({ documentId }: DocumentViewerProps) {
  const [language, setLanguage] = useState<"en" | "hi">("en")
  const [viewMode, setViewMode] = useState<"summary" | "original" | "split">("split")
  const [copiedText, setCopiedText] = useState(false)

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedText(true)
    setTimeout(() => setCopiedText(false), 2000)
  }

  const hindiSummary = `यह महत्वपूर्ण सर्वोच्च न्यायालय के फैसले में भारतीय संविधान की मूल संरचना स्थापित की गई है। न्यायालय ने माना कि संसद के पास अनुच्छेद 368 के तहत संशोधन की शक्तियां हैं, लेकिन ये शक्तियां मूल विशेषताओं तक सीमित हैं। मूल विशेषताएं—संविधान की सर्वोच्चता, संघीय संरचना, शक्तियों का पृथक्करण, और न्यायिक पुनरीक्षा—संवैधानिक संशोधनों के माध्यम से परिवर्तित नहीं की जा सकती हैं।`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{mockDocument.name}</h1>
          <p className="text-muted-foreground">Case decided on April 24, 1973 • Supreme Court of India</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-foreground">Language:</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
              className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm"
            >
              <option value="en">English</option>
              <option value="hi">Hindi (हिन्दी)</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleCopy(mockDocument.summary)}>
              <Copy className="h-4 w-4 mr-2" />
              {copiedText ? "Copied!" : "Copy"}
            </Button>
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* View Mode Tabs */}
      <Tabs
        value={viewMode}
        onValueChange={(v) => setViewMode(v as "summary" | "original" | "split")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="original">Original</TabsTrigger>
          <TabsTrigger value="split">Side-by-Side</TabsTrigger>
        </TabsList>

        {/* Summary View */}
        <TabsContent value="summary" className="space-y-4">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5 text-accent" />
                AI-Generated Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground leading-relaxed">
                {language === "en" ? mockDocument.summary : hindiSummary}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <Card className="border-border bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Key Points</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockDocument.keyPoints.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-accent font-bold mt-1">•</span>
                          <span className="text-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-border bg-muted/30">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base">Applicable Laws</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {mockDocument.applicableLaws.map((law, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <span className="text-accent font-bold mt-1">•</span>
                          <span className="text-foreground">{law}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Original View */}
        <TabsContent value="original">
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="text-lg">Original Document</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <pre className="bg-muted/50 p-6 rounded-lg overflow-auto max-h-96 text-foreground text-sm leading-relaxed whitespace-pre-wrap">
                  {mockDocument.originalText}
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Split View */}
        <TabsContent value="split">
          <div className="grid md:grid-cols-2 gap-4">
            {/* Original */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Original Text</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted/50 p-4 rounded-lg overflow-auto max-h-96 text-foreground text-xs leading-relaxed whitespace-pre-wrap">
                  {mockDocument.originalText}
                </pre>
              </CardContent>
            </Card>

            {/* Summary */}
            <Card className="border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent" />
                  AI Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 overflow-auto max-h-96">
                  <p className="text-foreground text-sm leading-relaxed">
                    {language === "en" ? mockDocument.summary : hindiSummary}
                  </p>

                  <div className="pt-4 border-t border-border">
                    <h4 className="font-medium text-foreground text-sm mb-2">Key Points:</h4>
                    <ul className="space-y-1">
                      {mockDocument.keyPoints.map((point, i) => (
                        <li key={i} className="text-xs text-muted-foreground">
                          • {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Related Cases */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle>Related Cases & Citations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { title: "Indira Gandhi v. Raj Narain", year: "1975", relevance: "High" },
              { title: "Golaknath v. State of Punjab", year: "1967", relevance: "Very High" },
              { title: "Shankari Prasad v. India", year: "1951", relevance: "Medium" },
            ].map((case_, i) => (
              <div
                key={i}
                className="p-4 rounded-lg border border-border hover:border-accent/50 transition cursor-pointer"
              >
                <p className="font-medium text-sm text-foreground mb-1">{case_.title}</p>
                <p className="text-xs text-muted-foreground mb-2">{case_.year}</p>
                <span className="inline-block px-2 py-1 bg-accent/20 text-accent text-xs rounded">
                  {case_.relevance}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
