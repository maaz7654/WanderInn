import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Find Your Dream Vacation Rental
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Discover and book unique homes, experiences, and places around the world.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/properties">
                <Button size="lg" className="w-full min-[400px]:w-auto">
                  Browse Properties
                </Button>
              </Link>
              <Link href="/hosts">
                <Button size="lg" variant="outline" className="w-full min-[400px]:w-auto">
                  Become a Host
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[350px] w-full overflow-hidden rounded-xl bg-muted md:h-[450px]">
              <img
                src="/placeholder.svg?height=450&width=600"
                alt="Hero Image"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

