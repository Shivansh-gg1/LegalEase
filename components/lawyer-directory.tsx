"use client"

import { useState, useMemo } from "react"
import { Search, MapPin, Star, MessageCircle, Phone, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Lawyer {
  id: string
  name: string
  specialization: string[]
  location: string
  experience: number
  rating: number
  reviews: number
  verified: boolean
  barCouncilId: string
  description: string
  consultationFee: number
  responseTime: string
  image?: string
}

const mockLawyers: Lawyer[] = [
  {
    id: "1",
    name: "Rajesh Kumar Singh",
    specialization: ["Criminal Law", "IPC Cases", "Appeals"],
    location: "New Delhi",
    experience: 15,
    rating: 4.8,
    reviews: 127,
    verified: true,
    barCouncilId: "BCI-2008-45892",
    description: "Experienced criminal lawyer with expertise in defending complex cases under Indian criminal law.",
    consultationFee: 500,
    responseTime: "<1 hour",
    image: "/lawyer-avatar-1.jpg",
  },
  {
    id: "2",
    name: "Priya Sharma",
    specialization: ["Family Law", "Divorce", "Child Custody"],
    location: "Mumbai",
    experience: 12,
    rating: 4.9,
    reviews: 184,
    verified: true,
    barCouncilId: "BCI-2010-52134",
    description: "Compassionate family law attorney specializing in divorce and custody matters.",
    consultationFee: 400,
    responseTime: "<2 hours",
    image: "/lawyer-avatar-2.jpg",
  },
  {
    id: "3",
    name: "Amit Patel",
    specialization: ["Corporate Law", "Contracts", "M&A"],
    location: "Bangalore",
    experience: 18,
    rating: 4.7,
    reviews: 156,
    verified: true,
    barCouncilId: "BCI-2005-38921",
    description: "Corporate law specialist handling mergers, acquisitions, and complex contracts.",
    consultationFee: 800,
    responseTime: "<3 hours",
    image: "/lawyer-avatar-3.jpg",
  },
  {
    id: "4",
    name: "Neha Verma",
    specialization: ["Labor Law", "Employment", "Industrial Relations"],
    location: "Hyderabad",
    experience: 10,
    rating: 4.6,
    reviews: 92,
    verified: true,
    barCouncilId: "BCI-2012-61245",
    description: "Employment law expert handling labor disputes and worker compensation cases.",
    consultationFee: 450,
    responseTime: "<1 hour",
    image: "/lawyer-avatar-4.jpg",
  },
  {
    id: "5",
    name: "Vikram Desai",
    specialization: ["Property Law", "Real Estate", "Disputes"],
    location: "Pune",
    experience: 14,
    rating: 4.5,
    reviews: 118,
    verified: true,
    barCouncilId: "BCI-2009-47856",
    description: "Real estate attorney specializing in property transactions and disputes.",
    consultationFee: 600,
    responseTime: "<2 hours",
    image: "/lawyer-avatar-5.jpg",
  },
  {
    id: "6",
    name: "Anjali Reddy",
    specialization: ["Consumer Protection", "Taxation", "Grievances"],
    location: "Chennai",
    experience: 11,
    rating: 4.4,
    reviews: 87,
    verified: true,
    barCouncilId: "BCI-2011-55432",
    description: "Consumer rights advocate and tax consultant with expertise in government grievances.",
    consultationFee: 350,
    responseTime: "<4 hours",
    image: "/lawyer-avatar-6.jpg",
  },
]

export function LawyerDirectory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>("")
  const [selectedLocation, setSelectedLocation] = useState<string>("")

  const specializations = Array.from(new Set(mockLawyers.flatMap((l) => l.specialization))).sort()

  const locations = Array.from(new Set(mockLawyers.map((l) => l.location))).sort()

  const filteredLawyers = useMemo(() => {
    return mockLawyers.filter((lawyer) => {
      const matchesSearch =
        lawyer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lawyer.description.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesSpecialization = !selectedSpecialization || lawyer.specialization.includes(selectedSpecialization)

      const matchesLocation = !selectedLocation || lawyer.location === selectedLocation

      return matchesSearch && matchesSpecialization && matchesLocation
    })
  }, [searchTerm, selectedSpecialization, selectedLocation])

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-3">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground"
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <select
            value={selectedSpecialization}
            onChange={(e) => setSelectedSpecialization(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card text-foreground"
          >
            <option value="">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>

          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card text-foreground"
          >
            <option value="">All Locations</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Found <span className="font-medium text-foreground">{filteredLawyers.length}</span> lawyer
        {filteredLawyers.length !== 1 ? "s" : ""}
      </div>

      {/* Lawyer Cards */}
      {filteredLawyers.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLawyers.map((lawyer) => (
            <LawyerCard key={lawyer.id} lawyer={lawyer} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">No lawyers found matching your criteria.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedSpecialization("")
              setSelectedLocation("")
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}

function LawyerCard({ lawyer }: { lawyer: Lawyer }) {
  return (
    <Card className="border-border hover:border-accent/50 transition overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-foreground">{lawyer.name}</h3>
              {lawyer.verified && <CheckCircle className="h-4 w-4 text-accent" title="Bar Council Verified" />}
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {lawyer.location}
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(lawyer.rating) ? "fill-accent text-accent" : "text-muted"}`}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-foreground">{lawyer.rating}</span>
          <span className="text-xs text-muted-foreground">({lawyer.reviews})</span>
        </div>

        {/* Specializations */}
        <div className="flex flex-wrap gap-1 mb-3">
          {lawyer.specialization.slice(0, 2).map((spec) => (
            <Badge key={spec} variant="outline" className="text-xs">
              {spec}
            </Badge>
          ))}
          {lawyer.specialization.length > 2 && (
            <Badge variant="outline" className="text-xs">
              +{lawyer.specialization.length - 2}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2">{lawyer.description}</p>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="p-2 rounded bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Experience</p>
            <p className="font-medium text-foreground">{lawyer.experience} years</p>
          </div>
          <div className="p-2 rounded bg-muted/50">
            <p className="text-xs text-muted-foreground mb-1">Consultation</p>
            <p className="font-medium text-foreground">₹{lawyer.consultationFee}</p>
          </div>
        </div>

        {/* Bar Council ID */}
        <div className="text-xs bg-primary/5 border border-primary/20 rounded p-2 text-muted-foreground">
          <span className="font-medium">BCI ID:</span> {lawyer.barCouncilId}
        </div>

        {/* Response Time */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground">Response time: {lawyer.responseTime}</span>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button size="sm" className="flex-1 bg-accent hover:bg-accent/90">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact
          </Button>
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            <Phone className="h-4 w-4 mr-2" />
            Call
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
