"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Users, FileText, CheckCircle, AlertCircle, TrendingUp, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

// Chart data
const monthlyData = [
  { month: "Jan", uploads: 120, bookings: 45, verified: 32 },
  { month: "Feb", uploads: 180, bookings: 65, verified: 48 },
  { month: "Mar", uploads: 240, bookings: 95, verified: 72 },
  { month: "Apr", uploads: 290, bookings: 120, verified: 95 },
  { month: "May", uploads: 350, bookings: 155, verified: 130 },
  { month: "Jun", uploads: 420, bookings: 200, verified: 165 },
]

const lawyerVerificationData = [
  { status: "Verified", value: 245, color: "#22c55e" },
  { status: "Pending", value: 42, color: "#f59e0b" },
  { status: "Rejected", value: 8, color: "#ef4444" },
]

interface PendingLawyer {
  id: string
  name: string
  specialization: string
  barCouncilId: string
  submittedAt: string
  documents: number
}

const pendingLawyers: PendingLawyer[] = [
  {
    id: "1",
    name: "Kavya Reddy",
    specialization: "Criminal Law",
    barCouncilId: "BCI-2023-75931",
    submittedAt: "2025-11-08",
    documents: 4,
  },
  {
    id: "2",
    name: "Sanjay Mishra",
    specialization: "Environmental Law",
    barCouncilId: "BCI-2022-64205",
    submittedAt: "2025-11-10",
    documents: 3,
  },
  {
    id: "3",
    name: "Deepika Nair",
    specialization: "IP & Patents",
    barCouncilId: "BCI-2023-81456",
    submittedAt: "2025-11-11",
    documents: 5,
  },
  {
    id: "4",
    name: "Rohan Kapoor",
    specialization: "Banking & Finance",
    barCouncilId: "BCI-2024-92837",
    submittedAt: "2025-11-12",
    documents: 4,
  },
]

export function AdminDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview")

  return (
    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Admin Dashboard</h2>
        <p className="text-muted-foreground">Monitor system health, verify lawyers, and manage platform analytics</p>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Total Users</p>
                <p className="text-3xl font-bold text-foreground mt-2">2,847</p>
                <p className="text-xs text-accent mt-2">↑ 12% from last month</p>
              </div>
              <Users className="h-10 w-10 text-accent/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Documents Uploaded</p>
                <p className="text-3xl font-bold text-foreground mt-2">1,642</p>
                <p className="text-xs text-accent mt-2">↑ 8% from last month</p>
              </div>
              <FileText className="h-10 w-10 text-accent/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">Verified Lawyers</p>
                <p className="text-3xl font-bold text-foreground mt-2">245</p>
                <p className="text-xs text-accent mt-2">42 pending verification</p>
              </div>
              <CheckCircle className="h-10 w-10 text-accent/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground font-medium">System Health</p>
                <p className="text-3xl font-bold text-foreground mt-2">99.8%</p>
                <p className="text-xs text-green-600 mt-2">All systems operational</p>
              </div>
              <TrendingUp className="h-10 w-10 text-accent/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-muted/50">
          <TabsTrigger value="overview">Analytics</TabsTrigger>
          <TabsTrigger value="verification">Lawyer Verification</TabsTrigger>
          <TabsTrigger value="health">System Health</TabsTrigger>
        </TabsList>

        {/* Analytics Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Monthly Growth Chart */}
            <Card className="border-border lg:col-span-2">
              <CardHeader>
                <CardTitle>Monthly Activity Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                    <XAxis stroke="var(--color-muted-foreground)" />
                    <YAxis stroke="var(--color-muted-foreground)" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "var(--color-card)",
                        border: `1px solid var(--color-border)`,
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="uploads" stroke="var(--color-primary)" strokeWidth={2} />
                    <Line type="monotone" dataKey="bookings" stroke="var(--color-accent)" strokeWidth={2} />
                    <Line type="monotone" dataKey="verified" stroke="var(--color-secondary)" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Lawyer Verification Pie Chart */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="text-base">Lawyer Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={lawyerVerificationData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {lawyerVerificationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  {lawyerVerificationData.map((item) => (
                    <div key={item.status} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-muted-foreground">{item.status}</span>
                      </div>
                      <span className="font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Processing Chart */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Document Processing Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                  <XAxis stroke="var(--color-muted-foreground)" />
                  <YAxis stroke="var(--color-muted-foreground)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "var(--color-card)",
                      border: `1px solid var(--color-border)`,
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="uploads" fill="var(--color-primary)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Lawyer Verification Tab */}
        <TabsContent value="verification" className="space-y-6">
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Pending Lawyer Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-foreground">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Specialization</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Bar Council ID</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Submitted</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Docs</th>
                      <th className="text-left py-3 px-4 font-medium text-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingLawyers.map((lawyer) => (
                      <tr key={lawyer.id} className="border-b border-border hover:bg-muted/30 transition">
                        <td className="py-4 px-4">
                          <p className="font-medium text-foreground">{lawyer.name}</p>
                        </td>
                        <td className="py-4 px-4">
                          <Badge variant="outline">{lawyer.specialization}</Badge>
                        </td>
                        <td className="py-4 px-4 text-muted-foreground text-xs font-mono">{lawyer.barCouncilId}</td>
                        <td className="py-4 px-4 text-muted-foreground">{lawyer.submittedAt}</td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <FileText className="h-4 w-4 text-accent" />
                            <span>{lawyer.documents}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-accent hover:bg-accent/90">
                              Review
                            </Button>
                            <Button size="sm" variant="outline">
                              Reject
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Health Tab */}
        <TabsContent value="health" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-border border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="text-base">API Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Document Upload API</span>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">AI Summarization Service</span>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Lawyer Database</span>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Mediation Portal</span>
                    <Badge className="bg-green-100 text-green-800">Operational</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="text-base">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground text-sm">Average Response Time</span>
                      <span className="font-medium text-foreground">234ms</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: "40%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground text-sm">Server CPU Usage</span>
                      <span className="font-medium text-foreground">45%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: "45%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground text-sm">Memory Usage</span>
                      <span className="font-medium text-foreground">62%</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: "62%" }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-muted-foreground text-sm">Database Size</span>
                      <span className="font-medium text-foreground">2.4 GB / 5 GB</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent" style={{ width: "48%" }} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Alerts */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent System Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { time: "2 hours ago", message: "Database backup completed successfully", type: "success" },
                  { time: "5 hours ago", message: "High traffic spike detected and handled", type: "warning" },
                  { time: "1 day ago", message: "SSL certificate renewed", type: "success" },
                  { time: "2 days ago", message: "API rate limit temporarily increased", type: "info" },
                ].map((alert, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border">
                    {alert.type === "success" && (
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                    )}
                    {alert.type === "warning" && (
                      <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    )}
                    {alert.type === "info" && <Clock className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
