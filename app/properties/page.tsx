"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { MainNav } from "@/components/main-nav";
import { Search, SlidersHorizontal } from "lucide-react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export default function PropertiesPage() {
	const [priceRange, setPriceRange] = useState([50, 500]);
	const [searchQuery, setSearchQuery] = useState("");

	// Sample properties data
	const properties = [
		{
			id: 1,
			title: "Modern Apartment in Downtown",
			description: "A beautiful modern apartment in the heart of the city",
			location: "New York, USA",
			price: 150,
			rating: 4.8,
			reviews: 124,
			image: "/placeholder.svg?height=300&width=400",
			amenities: ["wifi", "parking", "ac", "kitchen"],
		},
		{
			id: 2,
			title: "Cozy Beach House",
			description: "Relax and enjoy the ocean views from this cozy beach house",
			location: "Miami, USA",
			price: 200,
			rating: 4.9,
			reviews: 89,
			image: "/placeholder.svg?height=300&width=400",
			amenities: ["wifi", "pool", "ac", "kitchen"],
		},
		{
			id: 3,
			title: "Mountain Cabin Retreat",
			description: "Escape to the mountains in this beautiful cabin",
			location: "Aspen, USA",
			price: 180,
			rating: 4.7,
			reviews: 56,
			image: "/placeholder.svg?height=300&width=400",
			amenities: ["wifi", "parking", "ac", "kitchen"],
		},
		{
			id: 4,
			title: "Luxury Villa with Pool",
			description:
				"Enjoy luxury living in this spacious villa with a private pool",
			location: "Los Angeles, USA",
			price: 350,
			rating: 4.9,
			reviews: 112,
			image: "/placeholder.svg?height=300&width=400",
			amenities: ["wifi", "pool", "ac", "kitchen", "gym"],
		},
		{
			id: 5,
			title: "Downtown Loft",
			description:
				"Modern loft in the heart of downtown with amazing city views",
			location: "Chicago, USA",
			price: 120,
			rating: 4.6,
			reviews: 78,
			image: "/placeholder.svg?height=300&width=400",
			amenities: ["wifi", "ac", "kitchen"],
		},
		{
			id: 6,
			title: "Seaside Cottage",
			description: "Charming cottage just steps away from the beach",
			location: "San Diego, USA",
			price: 160,
			rating: 4.8,
			reviews: 94,
			image: "/placeholder.svg?height=300&width=400",
			amenities: ["wifi", "parking", "ac", "kitchen"],
		},
	];

	const amenities = [
		{ id: "wifi", label: "WiFi" },
		{ id: "parking", label: "Free Parking" },
		{ id: "pool", label: "Swimming Pool" },
		{ id: "ac", label: "Air Conditioning" },
		{ id: "kitchen", label: "Kitchen" },
		{ id: "tv", label: "TV" },
		{ id: "washer", label: "Washer" },
		{ id: "dryer", label: "Dryer" },
		{ id: "gym", label: "Gym" },
		{ id: "breakfast", label: "Breakfast" },
	];

	const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

	// Filter properties based on price range, search query, and selected amenities
	const filteredProperties = properties.filter((property) => {
		const matchesPrice =
			property.price >= priceRange[0] && property.price <= priceRange[1];
		const matchesSearch =
			property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
			property.description.toLowerCase().includes(searchQuery.toLowerCase());
		const matchesAmenities =
			selectedAmenities.length === 0 ||
			selectedAmenities.every((amenity) =>
				property.amenities.includes(amenity)
			);
		return matchesPrice && matchesSearch && matchesAmenities;
	});

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
				<div className="container py-6 md:py-8">
					<div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
						<div>
							<h1 className="text-3xl font-bold tracking-tight">Properties</h1>
							<p className="text-muted-foreground">
								Find and book your perfect stay from our collection of
								properties.
							</p>
						</div>
						<div className="flex items-center gap-2">
							<div className="relative w-full sm:w-[300px]">
								<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
								<Input
									type="search"
									placeholder="Search properties..."
									className="pl-8"
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
								/>
							</div>
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="outline" size="icon">
										<SlidersHorizontal className="h-4 w-4" />
										<span className="sr-only">Filter</span>
									</Button>
								</SheetTrigger>
								<SheetContent>
									<SheetHeader>
										<SheetTitle>Filter Properties</SheetTitle>
										<SheetDescription>
											Adjust filters to find your perfect stay.
										</SheetDescription>
									</SheetHeader>
									<div className="py-6">
										<div className="mb-6">
											<h3 className="mb-2 font-medium">Price Range</h3>
											<div className="mb-2 flex justify-between">
												<span>${priceRange[0]}</span>
												<span>${priceRange[1]}</span>
											</div>
											<Slider
												defaultValue={priceRange}
												min={0}
												max={1000}
												step={10}
												onValueChange={(value) =>
													setPriceRange(value as number[])
												}
											/>
										</div>
										<div>
											<h3 className="mb-2 font-medium">Amenities</h3>
											<div className="space-y-2">
												{amenities.map((amenity) => (
													<div
														key={amenity.id}
														className="flex items-center space-x-2"
													>
														<Checkbox
															id={`filter-${amenity.id}`}
															checked={selectedAmenities.includes(amenity.id)}
															onCheckedChange={(checked) => {
																if (checked) {
																	setSelectedAmenities([
																		...selectedAmenities,
																		amenity.id,
																	]);
																} else {
																	setSelectedAmenities(
																		selectedAmenities.filter(
																			(id) => id !== amenity.id
																		)
																	);
																}
															}}
														/>
														<label
															htmlFor={`filter-${amenity.id}`}
															className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
														>
															{amenity.label}
														</label>
													</div>
												))}
											</div>
										</div>
									</div>
								</SheetContent>
							</Sheet>
						</div>
					</div>

					{filteredProperties.length > 0 ? (
						<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{filteredProperties.map((property) => (
								<Link
									href={`/properties/${property.id}`}
									key={property.id}
									className="group"
								>
									<Card className="overflow-hidden transition-all hover:shadow-lg">
										<div className="aspect-video w-full overflow-hidden">
											<img
												src={property.image || "/placeholder.svg"}
												alt={property.title}
												className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
											/>
										</div>
										<CardHeader className="p-4">
											<CardTitle className="line-clamp-1">
												{property.title}
											</CardTitle>
											<CardDescription className="line-clamp-1">
												{property.location}
											</CardDescription>
										</CardHeader>
										<CardContent className="p-4 pt-0">
											<p className="line-clamp-2 text-sm text-muted-foreground">
												{property.description}
											</p>
											<div className="mt-4 flex items-center justify-between">
												<div className="flex items-center gap-1">
													<svg
														xmlns="http://www.w3.org/2000/svg"
														viewBox="0 0 24 24"
														fill="currentColor"
														className="h-4 w-4 text-amber-500"
													>
														<path
															fillRule="evenodd"
															d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
															clipRule="evenodd"
														/>
													</svg>
													<span className="text-sm font-medium">
														{property.rating}
													</span>
													<span className="text-sm text-muted-foreground">
														({property.reviews})
													</span>
												</div>
												<div className="text-right">
													<span className="text-lg font-bold">
														${property.price}
													</span>
													<span className="text-sm text-muted-foreground">
														{" "}
														/ night
													</span>
												</div>
											</div>
										</CardContent>
										<CardFooter className="p-4 pt-0">
											<div className="flex flex-wrap gap-1">
												{property.amenities.slice(0, 3).map((amenity) => (
													<span
														key={amenity}
														className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
													>
														{amenities.find((a) => a.id === amenity)?.label}
													</span>
												))}
												{property.amenities.length > 3 && (
													<span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
														+{property.amenities.length - 3} more
													</span>
												)}
											</div>
										</CardFooter>
									</Card>
								</Link>
							))}
						</div>
					) : (
						<div className="flex h-[400px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
							<div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
								<Search className="h-10 w-10 text-muted-foreground" />
								<h3 className="mt-4 text-lg font-semibold">
									No Properties Found
								</h3>
								<p className="mb-4 mt-2 text-sm text-muted-foreground">
									We couldn't find any properties matching your search criteria.
									Try adjusting your filters or search query.
								</p>
								<Button
									onClick={() => {
										setSearchQuery("");
										setPriceRange([50, 500]);
										setSelectedAmenities([]);
									}}
								>
									Reset Filters
								</Button>
							</div>
						</div>
					)}
				</div>
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
