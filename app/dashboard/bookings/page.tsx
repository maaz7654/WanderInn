import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function BookingsPage() {
  // Sample bookings data
  const upcomingBookings = [
    {
      id: 1,
      property: "Modern Apartment in Downtown",
      location: "New York, USA",
      checkIn: "2025-04-15",
      checkOut: "2025-04-20",
      guests: 2,
      status: "confirmed",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      property: "Cozy Beach House",
      location: "Miami, USA",
      checkIn: "2025-05-10",
      checkOut: "2025-05-17",
      guests: 4,
      status: "confirmed",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const pastBookings = [
    {
      id: 3,
      property: "Mountain Cabin Retreat",
      location: "Aspen, USA",
      checkIn: "2025-01-05",
      checkOut: "2025-01-10",
      guests: 3,
      status: "completed",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      property: "Luxury Villa with Pool",
      location: "Los Angeles, USA",
      checkIn: "2024-12-20",
      checkOut: "2024-12-27",
      guests: 6,
      status: "completed",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 5,
      property: "Downtown Loft",
      location: "Chicago, USA",
      checkIn: "2024-11-15",
      checkOut: "2024-11-18",
      guests: 2,
      status: "cancelled",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
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

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">My Bookings</h2>
        <p className="text-muted-foreground">View and manage your upcoming and past bookings.</p>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4">
          {upcomingBookings.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {upcomingBookings.map((booking) => (
                <Card key={booking.id}>
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={booking.image || "/placeholder.svg"}
                      alt={booking.property}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{booking.property}</CardTitle>
                    <CardDescription>{booking.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Check-in:</span>
                        <span className="text-sm">{formatDate(booking.checkIn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Check-out:</span>
                        <span className="text-sm">{formatDate(booking.checkOut)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Guests:</span>
                        <span className="text-sm">{booking.guests}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Status:</span>
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href={`/dashboard/bookings/${booking.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    <Button size="sm">Contact Host</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Upcoming Bookings</CardTitle>
                <CardDescription>You don't have any upcoming bookings at the moment.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">Start exploring properties to plan your next trip!</p>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button>Browse Properties</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4">
          {pastBookings.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pastBookings.map((booking) => (
                <Card key={booking.id}>
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={booking.image || "/placeholder.svg"}
                      alt={booking.property}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{booking.property}</CardTitle>
                    <CardDescription>{booking.location}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Check-in:</span>
                        <span className="text-sm">{formatDate(booking.checkIn)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Check-out:</span>
                        <span className="text-sm">{formatDate(booking.checkOut)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">Guests:</span>
                        <span className="text-sm">{booking.guests}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">Status:</span>
                        {getStatusBadge(booking.status)}
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Link href={`/dashboard/bookings/${booking.id}`}>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </Link>
                    {booking.status === "completed" && (
                      <Link href={`/dashboard/bookings/${booking.id}`}>
                        <Button size="sm">Leave Review</Button>
                      </Link>
                    )}
                    {booking.status === "cancelled" && <Button size="sm">Book Again</Button>}
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>No Past Bookings</CardTitle>
                <CardDescription>You don't have any past bookings.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Your booking history will appear here once you've completed stays.
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

