"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function AdminAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30days")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground">Platform performance metrics and insights.</p>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345</div>
            <p className="text-xs text-muted-foreground">+18.2% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245,231.89</div>
            <p className="text-xs text-muted-foreground">+15.3% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,345</div>
            <p className="text-xs text-muted-foreground">+8.2% from previous period</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.3%</div>
            <p className="text-xs text-muted-foreground">+0.5% from previous period</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Overview</CardTitle>
              <CardDescription>Key metrics for the selected time period.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full w-full items-center justify-center rounded-md border">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <LineChart className="h-10 w-10" />
                  <p>Overview chart would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Bookings by Property Type</CardTitle>
                <CardDescription>Distribution of bookings across different property types.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full w-full items-center justify-center rounded-md border">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <PieChart className="h-10 w-10" />
                    <p>Pie chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Booking Trends</CardTitle>
                <CardDescription>Booking patterns over time.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full w-full items-center justify-center rounded-md border">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <LineChart className="h-10 w-10" />
                    <p>Line chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New user registrations over time.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full w-full items-center justify-center rounded-md border">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <LineChart className="h-10 w-10" />
                    <p>Line chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>User Demographics</CardTitle>
                <CardDescription>Breakdown of users by location and type.</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="flex h-full w-full items-center justify-center rounded-md border">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BarChart className="h-10 w-10" />
                    <p>Bar chart would be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Analysis</CardTitle>
              <CardDescription>Detailed breakdown of platform revenue.</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <div className="flex h-full w-full items-center justify-center rounded-md border">
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <BarChart className="h-10 w-10" />
                  <p>Revenue charts would be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Earning Properties</CardTitle>
                <CardDescription>Properties generating the most revenue.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-md bg-muted"></div>
                      <div className="flex-1">
                        <div className="font-medium">Property {i + 1}</div>
                        <div className="text-sm text-muted-foreground">
                          ${(50000 - i * 5000).toLocaleString()} revenue
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Earning Locations</CardTitle>
                <CardDescription>Geographic areas generating the most revenue.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["New York, USA", "Miami, USA", "Los Angeles, USA", "Chicago, USA", "San Francisco, USA"].map(
                    (location, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-md bg-muted"></div>
                        <div className="flex-1">
                          <div className="font-medium">{location}</div>
                          <div className="text-sm text-muted-foreground">
                            ${(100000 - i * 10000).toLocaleString()} revenue
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </div>
                    ),
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

