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
import { Plus } from "lucide-react";

export default function PropertiesPage() {
	// Sample properties data
	const properties = [
		{
			id: 1,
			title: "Modern Apartment in Downtown",
			description: "A beautiful modern apartment in the heart of the city",
			location: "New York, USA",
			price: 150,
			image: "/placeholder.svg?height=300&width=400",
			bookings: 12,
		},
		{
			id: 2,
			title: "Cozy Beach House",
			description: "Relax and enjoy the ocean views from this cozy beach house",
			location: "Miami, USA",
			price: 200,
			image: "/placeholder.svg?height=300&width=400",
			bookings: 8,
		},
		{
			id: 3,
			title: "Mountain Cabin Retreat",
			description: "Escape to the mountains in this beautiful cabin",
			location: "Aspen, USA",
			price: 180,
			image: "/placeholder.svg?height=300&width=400",
			bookings: 5,
		},
	];

	return (
		<div className="flex flex-col gap-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-3xl font-bold tracking-tight">My Properties</h2>
					<p className="text-muted-foreground">
						Manage your property listings and view booking statistics.
					</p>
				</div>
				<Link href="/dashboard/properties/new">
					<Button>
						<Plus className="mr-2 h-4 w-4" />
						Add New Property
					</Button>
				</Link>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{properties.map((property) => (
					<Card key={property.id} className="overflow-hidden">
						<div className="aspect-video w-full overflow-hidden">
							<img
								src={property.image || "/placeholder.svg"}
								alt={property.title}
								className="h-full w-full object-cover"
							/>
						</div>
						<CardHeader>
							<CardTitle>{property.title}</CardTitle>
							<CardDescription>{property.location}</CardDescription>
						</CardHeader>
						<CardContent>
							<p className="line-clamp-2 text-sm text-muted-foreground">
								{property.description}
							</p>
							<div className="mt-4 flex items-center justify-between">
								<div>
									<p className="text-sm font-medium">Price per night</p>
									<p className="text-2xl font-bold">${property.price}</p>
								</div>
								<div className="text-right">
									<p className="text-sm font-medium">Bookings</p>
									<p className="text-xl font-bold">{property.bookings}</p>
								</div>
							</div>
						</CardContent>
						<CardFooter className="flex justify-between">
							<Button variant="outline" size="sm">
								Edit
							</Button>
							<Button size="sm">View Bookings</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
