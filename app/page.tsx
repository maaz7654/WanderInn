import Link from "next/link";
import { Button } from "@/components/ui/button";
import { TrendingDestinations } from "@/components/trending-destinations";
import { HeroSection } from "@/components/hero-section";
import { MainNav } from "@/components/main-nav";

export default function Home() {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="container flex h-16 items-center">
					<MainNav />
					<div className="ml-auto flex items-center space-x-4">
						<Link href="/login">
							<Button variant="ghost" size="sm">
								Log in
							</Button>
						</Link>
						<Link href="/signup">
							<Button size="sm">Sign up</Button>
						</Link>
					</div>
				</div>
			</header>
			<main className="flex-1">
				<HeroSection />
				<section className="container py-12 md:py-24 lg:py-32">
					<div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
						<h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
							Find your perfect stay
						</h2>
						<p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
							Discover unique homes, experiences, and places around the world.
						</p>
					</div>
				</section>
				<TrendingDestinations />
			</main>
			<footer className="border-t py-6 md:py-0">
				<div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
					<p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
						© 2025 WanderInn. All rights reserved.
					</p>
					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						<Link
							href="/terms"
							className="underline underline-offset-4 hover:text-foreground"
						>
							Terms
						</Link>
						<Link
							href="/privacy"
							className="underline underline-offset-4 hover:text-foreground"
						>
							Privacy
						</Link>
						<Link
							href="/contact"
							className="underline underline-offset-4 hover:text-foreground"
						>
							Contact
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
