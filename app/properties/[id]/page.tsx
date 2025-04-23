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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "@/components/ui/calendar";
import { MainNav } from "@/components/main-nav";
import { ArrowLeft, Check, Heart, MapPin, Share, Star } from "lucide-react";

export default function PropertyDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const [selectedDates, setSelectedDates] = useState<Date[] | undefined>();
	const [guests, setGuests] = useState(1);

	// In a real app, this would fetch the property data based on the ID
	const property = {
		id: Number.parseInt(params.id),
		title: "Luxury Beachfront Villa with Private Pool",
		description:
			"Experience the ultimate luxury getaway in this stunning beachfront villa. Featuring panoramic ocean views, a private infinity pool, and direct beach access, this property offers the perfect blend of comfort and elegance. The spacious interior includes 4 bedrooms, a gourmet kitchen, and a large living area with floor-to-ceiling windows to enjoy the breathtaking views. Outside, you'll find a beautiful terrace with lounge chairs, an outdoor dining area, and a BBQ grill. Located in a quiet and exclusive neighborhood, yet just a short drive from restaurants, shops, and attractions.",
		location: "Malibu, California, USA",
		price: 450,
		rating: 4.9,
		reviews: 124,
		host: {
			name: "Sarah Johnson",
			joined: "2020",
			response: "100%",
			responseTime: "within an hour",
			image: "/placeholder.svg?height=100&width=100",
		},
		amenities: [
			"WiFi",
			"Free Parking",
			"Swimming Pool",
			"Air Conditioning",
			"Kitchen",
			"TV",
			"Washer",
			"Dryer",
			"Beach Access",
			"Ocean View",
			"BBQ Grill",
			"Outdoor Dining",
			"King Size Beds",
			"En-suite Bathrooms",
			"Gym",
		],
		images: [
			"/placeholder.svg?height=600&width=800",
			"/placeholder.svg?height=600&width=800",
			"/placeholder.svg?height=600&width=800",
			"/placeholder.svg?height=600&width=800",
			"/placeholder.svg?height=600&width=800",
		],
		cancellationPolicy: "Flexible - Full refund 7 days before check-in",
		bedrooms: 4,
		bathrooms: 4.5,
		maxGuests: 8,
	};

	const calculateTotalPrice = () => {
		if (!selectedDates || selectedDates.length < 2) return 0;

		const startDate = selectedDates[0];
		const endDate = selectedDates[selectedDates.length - 1];
		const nights = Math.ceil(
			(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
		);

		return property.price * nights;
	};

	const totalPrice = calculateTotalPrice();
	const serviceFee = totalPrice * 0.12;
	const totalWithFees = totalPrice + serviceFee;

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
					<div className="mb-6">
						<Link
							href="/properties"
							className="mb-4 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
						>
							<ArrowLeft className="mr-1 h-4 w-4" />
							Back to properties
						</Link>
						<div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
							<h1 className="text-3xl font-bold tracking-tight">
								{property.title}
							</h1>
							<div className="flex items-center gap-2">
								<Button variant="outline" size="sm" className="h-8 gap-1">
									<Share className="h-4 w-4" />
									<span>Share</span>
								</Button>
								<Button variant="outline" size="sm" className="h-8 gap-1">
									<Heart className="h-4 w-4" />
									<span>Save</span>
								</Button>
							</div>
						</div>
						<div className="mt-2 flex items-center gap-2 text-sm">
							<div className="flex items-center">
								<Star className="mr-1 h-4 w-4 text-amber-500" />
								<span className="font-medium">{property.rating}</span>
								<span className="text-muted-foreground">
									({property.reviews} reviews)
								</span>
							</div>
							<span>•</span>
							<div className="flex items-center">
								<MapPin className="mr-1 h-4 w-4 text-muted-foreground" />
								<span>{property.location}</span>
							</div>
						</div>
					</div>

					<div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
						<div className="col-span-full md:col-span-2 lg:col-span-2 overflow-hidden rounded-lg">
							<img
								src={property.images[0] || "/placeholder.svg"}
								alt={property.title}
								className="h-full w-full object-cover"
							/>
						</div>
						{property.images.slice(1, 5).map((image, index) => (
							<div key={index} className="overflow-hidden rounded-lg">
								<img
									src={image || "/placeholder.svg"}
									alt={`${property.title} - Image ${index + 2}`}
									className="h-full w-full object-cover"
								/>
							</div>
						))}
					</div>

					<div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
						<div className="lg:col-span-2">
							<div className="mb-8 flex items-center justify-between border-b pb-6">
								<div>
									<h2 className="text-xl font-bold">
										Hosted by {property.host.name}
									</h2>
									<p className="text-muted-foreground">
										{property.bedrooms} bedrooms • {property.bathrooms}{" "}
										bathrooms • {property.maxGuests} guests max
									</p>
								</div>
								<div className="h-12 w-12 overflow-hidden rounded-full">
									<img
										src={property.host.image || "/placeholder.svg"}
										alt={property.host.name}
										className="h-full w-full object-cover"
									/>
								</div>
							</div>

							<div className="mb-8 border-b pb-6">
								<h2 className="mb-4 text-xl font-bold">About this place</h2>
								<p className="whitespace-pre-line text-muted-foreground">
									{property.description}
								</p>
							</div>

							<div className="mb-8 border-b pb-6">
								<h2 className="mb-4 text-xl font-bold">
									What this place offers
								</h2>
								<div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
									{property.amenities.map((amenity, index) => (
										<div key={index} className="flex items-center gap-2">
											<Check className="h-4 w-4 text-green-500" />
											<span>{amenity}</span>
										</div>
									))}
								</div>
							</div>

							<Tabs defaultValue="reviews" className="mb-8">
								<TabsList className="mb-4">
									<TabsTrigger value="reviews">Reviews</TabsTrigger>
									<TabsTrigger value="location">Location</TabsTrigger>
									<TabsTrigger value="host">Host</TabsTrigger>
								</TabsList>
								<TabsContent value="reviews">
									<div className="mb-4 flex items-center gap-2">
										<Star className="h-5 w-5 text-amber-500" />
										<span className="text-lg font-medium">
											{property.rating} · {property.reviews} reviews
										</span>
									</div>
									<div className="space-y-6">
										{Array.from({ length: 3 }).map((_, i) => (
											<div key={i} className="border-b pb-6 last:border-0">
												<div className="mb-2 flex items-center gap-2">
													<div className="h-10 w-10 overflow-hidden rounded-full bg-muted">
														<img
															src={`/placeholder.svg?height=40&width=40&text=U${
																i + 1
															}`}
															alt={`User ${i + 1}`}
															className="h-full w-full object-cover"
														/>
													</div>
													<div>
														<div className="font-medium">Guest {i + 1}</div>
														<div className="text-sm text-muted-foreground">
															{new Date(2025, i, i + 10).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																}
															)}
														</div>
													</div>
												</div>
												<p className="text-muted-foreground">
													{i === 0
														? "Amazing property with stunning views! The host was very responsive and accommodating. We had a wonderful stay and would definitely come back."
														: i === 1
														? "Beautiful place, very clean and well-maintained. The location is perfect, close to everything but still private and quiet."
														: "We had a fantastic time at this property. The amenities were great, and the host provided excellent recommendations for local activities and restaurants."}
												</p>
											</div>
										))}
										<Button variant="outline">
											Show all {property.reviews} reviews
										</Button>
									</div>
								</TabsContent>
								<TabsContent value="location">
									<div className="mb-4">
										<h3 className="text-lg font-medium">Location</h3>
										<p className="text-muted-foreground">{property.location}</p>
									</div>
									<div className="aspect-video overflow-hidden rounded-lg border">
										<div className="flex h-full w-full items-center justify-center bg-muted">
											<p className="text-center text-muted-foreground">
												Map would be displayed here
											</p>
										</div>
									</div>
								</TabsContent>
								<TabsContent value="host">
									<div className="flex items-start gap-4">
										<div className="h-16 w-16 overflow-hidden rounded-full">
											<img
												src={property.host.image || "/placeholder.svg"}
												alt={property.host.name}
												className="h-full w-full object-cover"
											/>
										</div>
										<div>
											<h3 className="text-lg font-medium">
												{property.host.name}
											</h3>
											<p className="text-muted-foreground">
												Host since {property.host.joined}
											</p>
											<div className="mt-2 space-y-1">
												<div className="flex items-center gap-2">
													<Star className="h-4 w-4 text-amber-500" />
													<span>{property.reviews} reviews</span>
												</div>
												<div className="flex items-center gap-2">
													<Check className="h-4 w-4 text-green-500" />
													<span>Identity verified</span>
												</div>
												<div className="flex items-center gap-2">
													<Check className="h-4 w-4 text-green-500" />
													<span>Response rate: {property.host.response}</span>
												</div>
												<div className="flex items-center gap-2">
													<Check className="h-4 w-4 text-green-500" />
													<span>
														Response time: {property.host.responseTime}
													</span>
												</div>
											</div>
											<Button className="mt-4">Contact Host</Button>
										</div>
									</div>
								</TabsContent>
							</Tabs>
						</div>

						<div>
							<Card className="sticky top-24">
								<CardHeader>
									<CardTitle className="flex items-baseline justify-between">
										<span>${property.price}</span>
										<span className="text-sm font-normal text-muted-foreground">
											night
										</span>
									</CardTitle>
									<CardDescription>
										<div className="flex items-center">
											<Star className="mr-1 h-4 w-4 text-amber-500" />
											<span className="font-medium">{property.rating}</span>
											<span className="text-muted-foreground">
												({property.reviews} reviews)
											</span>
										</div>
									</CardDescription>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="rounded-lg border">
										<div className="flex">
											<div className="flex-1 border-r p-4">
												<div className="text-xs font-medium uppercase">
													Check-in
												</div>
												<div className="font-medium">
													{selectedDates && selectedDates.length > 0
														? selectedDates[0].toLocaleDateString()
														: "Add date"}
												</div>
											</div>
											<div className="flex-1 p-4">
												<div className="text-xs font-medium uppercase">
													Checkout
												</div>
												<div className="font-medium">
													{selectedDates && selectedDates.length > 1
														? selectedDates[
																selectedDates.length - 1
														  ].toLocaleDateString()
														: "Add date"}
												</div>
											</div>
										</div>
										<div className="border-t p-4">
											<div className="text-xs font-medium uppercase">
												Guests
											</div>
											<div className="flex items-center justify-between">
												<div className="font-medium">
													{guests} {guests === 1 ? "guest" : "guests"}
												</div>
												<div className="flex items-center gap-2">
													<Button
														variant="outline"
														size="icon"
														className="h-6 w-6"
														onClick={() => setGuests(Math.max(1, guests - 1))}
														disabled={guests <= 1}
													>
														-
													</Button>
													<Button
														variant="outline"
														size="icon"
														className="h-6 w-6"
														onClick={() =>
															setGuests(
																Math.min(property.maxGuests, guests + 1)
															)
														}
														disabled={guests >= property.maxGuests}
													>
														+
													</Button>
												</div>
											</div>
										</div>
									</div>

									<div className="rounded-md border">
										<Calendar
											mode="range"
											selected={selectedDates}
											onSelect={setSelectedDates}
											className="rounded-md border"
											numberOfMonths={1}
										/>
									</div>

									<Button
										className="w-full"
										size="lg"
										disabled={!selectedDates || selectedDates.length < 2}
									>
										Reserve
									</Button>

									{selectedDates && selectedDates.length >= 2 && (
										<div className="space-y-2 pt-4">
											<div className="flex justify-between">
												<span>
													${property.price} x{" "}
													{Math.ceil(
														(selectedDates[selectedDates.length - 1].getTime() -
															selectedDates[0].getTime()) /
															(1000 * 60 * 60 * 24)
													)}{" "}
													nights
												</span>
												<span>${totalPrice}</span>
											</div>
											<div className="flex justify-between">
												<span>Service fee</span>
												<span>${serviceFee.toFixed(2)}</span>
											</div>
											<div className="flex justify-between border-t pt-2 font-bold">
												<span>Total</span>
												<span>${totalWithFees.toFixed(2)}</span>
											</div>
										</div>
									)}
								</CardContent>
								<CardFooter>
									<p className="text-center text-xs text-muted-foreground">
										You won't be charged yet. Cancellation policy:{" "}
										{property.cancellationPolicy}
									</p>
								</CardFooter>
							</Card>
						</div>
					</div>
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
