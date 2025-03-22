import Link from "next/link"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function TrendingDestinations() {
  // Sample trending destinations data
  const destinations = [
    {
      id: 1,
      name: "Bali, Indonesia",
      description: "Tropical paradise with beautiful beaches and rich culture",
      image: "/placeholder.svg?height=300&width=400",
      properties: 245,
    },
    {
      id: 2,
      name: "Paris, France",
      description: "The city of love with iconic landmarks and cuisine",
      image: "/placeholder.svg?height=300&width=400",
      properties: 189,
    },
    {
      id: 3,
      name: "Santorini, Greece",
      description: "Stunning island with white-washed buildings and blue domes",
      image: "/placeholder.svg?height=300&width=400",
      properties: 156,
    },
    {
      id: 4,
      name: "Tokyo, Japan",
      description: "Vibrant metropolis blending tradition and innovation",
      image: "/placeholder.svg?height=300&width=400",
      properties: 210,
    },
  ]

  return (
    <section className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">Trending Destinations</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explore the most popular places travelers are visiting right now
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-4">
        {destinations.map((destination) => (
          <Link href={`/destinations/${destination.id}`} key={destination.id} className="group">
            <Card className="overflow-hidden transition-all hover:shadow-lg">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={destination.image || "/placeholder.svg"}
                  alt={destination.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader className="p-4">
                <CardTitle className="line-clamp-1">{destination.name}</CardTitle>
                <CardDescription className="line-clamp-2">{destination.description}</CardDescription>
              </CardHeader>
              <CardFooter className="p-4 pt-0 text-sm text-muted-foreground">
                {destination.properties} properties
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}

