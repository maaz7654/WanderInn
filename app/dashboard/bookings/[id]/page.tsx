"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ReviewForm } from "@/components/review-form"
import { ArrowLeft, Calendar, Check, Clock, CreditCard, MapPin, MessageSquare, Phone, User } from "lucide-react"

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  const [reviewSubmitted, setReviewSubmitted] = useState(false)

  // In a real app, this would fetch the booking data based on the ID
  const booking = {
    id: Number.parseInt(params.id),
    property: {
      id: 1,
      title: "Modern Apartment in Downtown",
      location: "New York, USA",
      image: "/placeholder.svg?height=300&width=400",
      host: {
        name: "Jane Smith",
        phone: "+1 (555) 987-6543",
        image: "/placeholder.svg?height=100&width=100",
      },
    },
    checkIn: "2025-04-15",
    checkOut: "2025-04-20",
    guests: 2,
    status: "completed", // completed, confirmed, cancelled
    totalPrice: 750,
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    bookingDate: "2025-03-10",
    confirmationCode: "STAY12345",
    specialRequests: "Late check-in around 9 PM. Would appreciate extra towels if possible.",
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmed</Badge>
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const handleReviewSubmitted = () => {
    setReviewSubmitted(true)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/bookings">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Booking Details</h2>
          <p className="text-muted-foreground">View details for your booking at {booking.property.title}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <div className="aspect-video w-full overflow-hidden">
              <img
                src={booking.property.image || "/placeholder.svg"}
                alt={booking.property.title}
                className="h-full w-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{booking.property.title}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {booking.property.location}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="details" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="details">Booking Details</TabsTrigger>
                  <TabsTrigger value="payment">Payment</TabsTrigger>
                  <TabsTrigger value="host">Host Info</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Check-in
                      </div>
                      <div className="text-lg font-semibold">{formatDate(booking.checkIn)}</div>
                      <div className="text-sm text-muted-foreground">After 3:00 PM</div>
                    </div>
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        Check-out
                      </div>
                      <div className="text-lg font-semibold">{formatDate(booking.checkOut)}</div>
                      <div className="text-sm text-muted-foreground">Before 11:00 AM</div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Guests
                    </div>
                    <div className="text-lg font-semibold">
                      {booking.guests} {booking.guests === 1 ? "Guest" : "Guests"}
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Booking Status
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(booking.status)}
                      <span className="text-sm text-muted-foreground">Booked on {formatDate(booking.bookingDate)}</span>
                    </div>
                  </div>

                  {booking.specialRequests && (
                    <div className="rounded-lg border p-4">
                      <div className="mb-2 text-sm font-medium">Special Requests</div>
                      <p className="text-muted-foreground">{booking.specialRequests}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="payment" className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="font-medium">Payment Status</div>
                      <Badge className="bg-green-500">{booking.paymentStatus}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span className="font-medium">{booking.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Confirmation Code</span>
                        <span className="font-medium">{booking.confirmationCode}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Total Amount</span>
                        <span className="font-medium">${booking.totalPrice.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 text-sm font-medium">Payment Receipt</div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      You can download a copy of your payment receipt for your records.
                    </p>
                    <Button variant="outline" className="gap-2">
                      <CreditCard className="h-4 w-4" />
                      Download Receipt
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="host" className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 overflow-hidden rounded-full">
                      <img
                        src={booking.property.host.image || "/placeholder.svg"}
                        alt={booking.property.host.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium">{booking.property.host.name}</h3>
                      <p className="text-muted-foreground">Property Host</p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{booking.property.host.phone}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="mb-2 text-sm font-medium">Contact Host</div>
                    <p className="mb-4 text-sm text-muted-foreground">
                      If you have any questions or need assistance, you can contact the host directly.
                    </p>
                    <Button variant="outline" className="gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Message Host
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
              <CardDescription>Manage your booking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {booking.status === "confirmed" && (
                <Button className="w-full" variant="outline">
                  Cancel Booking
                </Button>
              )}

              {booking.status === "completed" && !reviewSubmitted && (
                <ReviewForm
                  propertyId={booking.property.id}
                  propertyName={booking.property.title}
                  onSubmitSuccess={handleReviewSubmitted}
                  trigger={<Button className="w-full">Leave a Review</Button>}
                />
              )}

              {booking.status === "completed" && reviewSubmitted && (
                <div className="rounded-lg border p-4 bg-green-50 text-green-700">
                  <div className="flex items-center gap-2">
                    <Check className="h-4 w-4" />
                    <span className="font-medium">Review Submitted</span>
                  </div>
                  <p className="mt-1 text-sm">Thank you for sharing your experience!</p>
                </div>
              )}

              <Button className="w-full" variant="outline">
                Download Booking Details
              </Button>

              <Link href={`/properties/${booking.property.id}`} className="w-full">
                <Button className="w-full" variant="outline">
                  View Property
                </Button>
              </Link>

              <Button className="w-full" variant="outline">
                Book Again
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col items-start gap-2 border-t px-6 py-4">
              <h4 className="text-sm font-medium">Need Help?</h4>
              <p className="text-sm text-muted-foreground">
                Contact our support team if you need assistance with your booking.
              </p>
              <Button variant="link" className="h-auto p-0 text-sm">
                Contact Support
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

