"use client"

import type React from "react"

import { useState } from "react"
import { Calendar, Clock, User, AlertCircle, CheckCircle, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TimeSlot {
  date: string
  time: string
  available: boolean
  price: number
}

interface Mediator {
  id: string
  name: string
  specialization: string
  experience: number
  rating: number
  availability: TimeSlot[]
  certifications: string[]
}

const mockMediators: Mediator[] = [
  {
    id: "1",
    name: "Dr. Arjun Kapoor",
    specialization: "Family Disputes & Divorce",
    experience: 12,
    rating: 4.9,
    certifications: ["NRLM Certified", "ICCR Certified"],
    availability: [
      { date: "2025-11-15", time: "10:00 AM", available: true, price: 1500 },
      { date: "2025-11-15", time: "2:00 PM", available: true, price: 1500 },
      { date: "2025-11-16", time: "11:00 AM", available: false, price: 1500 },
      { date: "2025-11-16", time: "3:00 PM", available: true, price: 1500 },
    ],
  },
  {
    id: "2",
    name: "Ms. Meera Sinha",
    specialization: "Commercial & Business Disputes",
    experience: 15,
    rating: 4.8,
    certifications: ["ICMDR Certified", "NRLM Certified"],
    availability: [
      { date: "2025-11-15", time: "9:00 AM", available: true, price: 2000 },
      { date: "2025-11-15", time: "1:00 PM", available: true, price: 2000 },
      { date: "2025-11-16", time: "10:00 AM", available: true, price: 2000 },
      { date: "2025-11-17", time: "2:00 PM", available: true, price: 2000 },
    ],
  },
  {
    id: "3",
    name: "Mr. Rajesh Verma",
    specialization: "Property & Real Estate",
    experience: 10,
    rating: 4.7,
    certifications: ["NRLM Certified", "AIACR Certified"],
    availability: [
      { date: "2025-11-15", time: "11:30 AM", available: true, price: 1800 },
      { date: "2025-11-16", time: "9:30 AM", available: false, price: 1800 },
      { date: "2025-11-16", time: "2:30 PM", available: true, price: 1800 },
      { date: "2025-11-17", time: "10:30 AM", available: true, price: 1800 },
    ],
  },
]

export function MediationBooking() {
  const [selectedStep, setSelectedStep] = useState<"mediator" | "schedule" | "details" | "confirmation">("mediator")
  const [selectedMediator, setSelectedMediator] = useState<Mediator | null>(null)
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    disputeDescription: "",
    otherPartyInfo: "",
  })

  const handleMediatorSelect = (mediator: Mediator) => {
    setSelectedMediator(mediator)
    setSelectedStep("schedule")
  }

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot)
    setSelectedStep("details")
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleConfirm = () => {
    if (formData.name && formData.email && formData.phone && formData.disputeDescription) {
      setSelectedStep("confirmation")
    }
  }

  return (
    <div className="space-y-8">
      {/* Stepper */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4">
        {[
          { step: "mediator", label: "Choose Mediator" },
          { step: "schedule", label: "Select Date & Time" },
          { step: "details", label: "Your Details" },
          { step: "confirmation", label: "Confirmation" },
        ].map((item, i, arr) => (
          <div key={item.step} className="flex items-center gap-4 flex-shrink-0">
            <div
              className={`h-10 w-10 rounded-full flex items-center justify-center font-medium text-sm transition ${
                selectedStep === item.step
                  ? "bg-accent text-accent-foreground"
                  : ["mediator", "schedule", "details"].includes(item.step) &&
                      ["mediator", "schedule", "details", "confirmation"].indexOf(selectedStep) >
                        ["mediator", "schedule", "details", "confirmation"].indexOf(item.step)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <div className="min-w-max">
              <p className="text-sm font-medium text-foreground">{item.label}</p>
            </div>
            {i < arr.length - 1 && <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />}
          </div>
        ))}
      </div>

      {/* Step 1: Choose Mediator */}
      {selectedStep === "mediator" && (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockMediators.map((mediator) => (
              <Card
                key={mediator.id}
                className={`border-2 cursor-pointer transition hover:border-accent ${
                  selectedMediator?.id === mediator.id ? "border-accent bg-accent/5" : "border-border"
                }`}
                onClick={() => handleMediatorSelect(mediator)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{mediator.name}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">{mediator.specialization}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-accent">{mediator.rating}</p>
                      <p className="text-xs text-muted-foreground">★ Rating</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-accent" />
                    <span>{mediator.experience} years experience</span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground">Certifications:</p>
                    <div className="flex flex-wrap gap-2">
                      {mediator.certifications.map((cert) => (
                        <span key={cert} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <Button className="w-full bg-accent hover:bg-accent/90">Choose Mediator</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Select Date & Time */}
      {selectedStep === "schedule" && selectedMediator && (
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
            <p className="text-sm font-medium text-foreground">
              Selected Mediator: <span className="text-accent">{selectedMediator.name}</span>
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-medium text-foreground">Available Time Slots:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {selectedMediator.availability.map((slot, i) => (
                <button
                  key={i}
                  onClick={() => slot.available && handleSlotSelect(slot)}
                  disabled={!slot.available}
                  className={`p-4 rounded-lg border-2 transition text-left ${
                    slot.available
                      ? selectedSlot === slot
                        ? "border-accent bg-accent/5 cursor-pointer"
                        : "border-border hover:border-accent/50 cursor-pointer"
                      : "border-border bg-muted/30 opacity-50 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground text-sm">{slot.date}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Clock className="h-4 w-4 text-accent" />
                        <span className="text-sm text-muted-foreground">{slot.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-accent">₹{slot.price}</p>
                      <p className={`text-xs ${slot.available ? "text-green-600" : "text-destructive"}`}>
                        {slot.available ? "Available" : "Booked"}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {selectedSlot && (
            <Button onClick={() => setSelectedStep("details")} className="w-full bg-accent hover:bg-accent/90">
              Continue to Details
            </Button>
          )}
        </div>
      )}

      {/* Step 3: Your Details */}
      {selectedStep === "details" && selectedMediator && selectedSlot && (
        <div className="space-y-4">
          <Card className="border-border bg-muted/30">
            <CardHeader>
              <CardTitle className="text-base">Booking Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Mediator:</span>
                <span className="font-medium">{selectedMediator.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date & Time:</span>
                <span className="font-medium">
                  {selectedSlot.date} at {selectedSlot.time}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-border">
                <span className="text-muted-foreground font-medium">Total Price:</span>
                <span className="font-bold text-accent">₹{selectedSlot.price}</span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Your Information</h3>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Dispute Description *</label>
              <textarea
                name="disputeDescription"
                value={formData.disputeDescription}
                onChange={handleFormChange}
                placeholder="Briefly describe the dispute"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Other Party Information</label>
              <textarea
                name="otherPartyInfo"
                value={formData.otherPartyInfo}
                onChange={handleFormChange}
                placeholder="Details about the other party (optional)"
                rows={3}
                className="w-full px-4 py-2 rounded-lg border border-border bg-card text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <Button onClick={handleConfirm} className="w-full bg-accent hover:bg-accent/90">
              Confirm Booking
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {selectedStep === "confirmation" && selectedMediator && selectedSlot && (
        <Card className="border-border">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-16 w-16 bg-accent/20 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-accent" />
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
              <p className="text-muted-foreground">Your mediation session has been successfully scheduled</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-6 space-y-4 text-left">
              <div className="flex items-start gap-3">
                <User className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Mediator</p>
                  <p className="text-foreground">{selectedMediator.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Calendar className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Date & Time</p>
                  <p className="text-foreground">
                    {selectedSlot.date} at {selectedSlot.time}
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-muted-foreground mb-2">Participant</p>
                <p className="text-foreground">{formData.name}</p>
                <p className="text-sm text-muted-foreground">{formData.email}</p>
              </div>
            </div>

            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <div className="text-left text-sm">
                  <p className="font-medium text-foreground mb-1">Next Steps:</p>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Confirmation email will be sent to {formData.email}</li>
                    <li>• Mediation link will be provided 1 hour before the session</li>
                    <li>• Please join 10 minutes early</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => {
                  setSelectedStep("mediator")
                  setSelectedMediator(null)
                  setSelectedSlot(null)
                  setFormData({ name: "", email: "", phone: "", disputeDescription: "", otherPartyInfo: "" })
                }}
                variant="outline"
                className="flex-1"
              >
                Book Another Session
              </Button>
              <Button className="flex-1 bg-accent hover:bg-accent/90">Download Confirmation</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
