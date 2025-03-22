"use client"

import { useState } from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Edit, Home, MessageSquare, Star, Trash, Upload, X } from "lucide-react"

const propertySchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  price: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Price must be a positive number.",
  }),
  location: z.string().min(3, {
    message: "Location is required.",
  }),
  propertyType: z.string({
    required_error: "Please select a property type.",
  }),
  bedrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Number of bedrooms must be a positive number.",
  }),
  bathrooms: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Number of bathrooms must be a positive number.",
  }),
  cancellationPolicy: z.string({
    required_error: "Please select a cancellation policy.",
  }),
})

type PropertyFormValues = z.infer<typeof propertySchema>

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(["wifi", "parking", "ac", "kitchen"])
  const [images, setImages] = useState<string[]>([
    "/placeholder.svg?height=300&width=400&text=Image 1",
    "/placeholder.svg?height=300&width=400&text=Image 2",
    "/placeholder.svg?height=300&width=400&text=Image 3",
  ])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // In a real app, this would fetch the property data based on the ID
  const property = {
    id: Number.parseInt(params.id),
    title: "Modern Apartment in Downtown",
    description:
      "A beautiful modern apartment in the heart of the city with stunning views and all amenities. Perfect for business travelers or couples looking for a central location with easy access to restaurants, shopping, and attractions.",
    location: "New York, USA",
    price: "150",
    propertyType: "apartment",
    bedrooms: "2",
    bathrooms: "1",
    cancellationPolicy: "flexible",
    status: "active",
    bookings: 12,
    rating: 4.8,
    reviews: 24,
    createdAt: "2024-01-15",
  }

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
  ]

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property.title,
      description: property.description,
      price: property.price,
      location: property.location,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      cancellationPolicy: property.cancellationPolicy,
    },
  })

  function onSubmit(data: PropertyFormValues) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(data, selectedAmenities, images)
      setIsSubmitting(false)
      setIsEditing(false)
      // In a real app, you would update the property state with the new data
    }, 1500)
  }

  const handleImageUpload = () => {
    // In a real app, this would handle file uploads
    // For demo purposes, we'll just add placeholder images
    if (images.length < 10) {
      setImages([...images, `/placeholder.svg?height=300&width=400&text=Image ${images.length + 1}`])
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/properties">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <h2 className="text-3xl font-bold tracking-tight">{property.title}</h2>
          <p className="text-muted-foreground">{property.location}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
            <Edit className="mr-2 h-4 w-4" />
            {isEditing ? "Cancel Editing" : "Edit Property"}
          </Button>
        </div>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Edit the basic details about your property.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Property Title</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. Cozy Apartment in Downtown" {...field} />
                      </FormControl>
                      <FormDescription>A catchy title will attract more guests.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your property in detail..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Include unique features, nearby attractions, and what makes your place special.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-6 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price per Night ($)</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="e.g. 100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. New York, USA" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="propertyType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="apartment">Apartment</SelectItem>
                            <SelectItem value="house">House</SelectItem>
                            <SelectItem value="condo">Condo</SelectItem>
                            <SelectItem value="villa">Villa</SelectItem>
                            <SelectItem value="cabin">Cabin</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bedrooms</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="e.g. 2" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bathrooms</FormLabel>
                        <FormControl>
                          <Input type="number" min="1" placeholder="e.g. 1" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Amenities</CardTitle>
                <CardDescription>Select the amenities available at your property.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {amenities.map((amenity) => (
                    <div key={amenity.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={amenity.id}
                        checked={selectedAmenities.includes(amenity.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAmenities([...selectedAmenities, amenity.id])
                          } else {
                            setSelectedAmenities(selectedAmenities.filter((id) => id !== amenity.id))
                          }
                        }}
                      />
                      <label
                        htmlFor={amenity.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {amenity.label}
                      </label>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Property Images</CardTitle>
                <CardDescription>
                  Upload up to 10 images of your property. The first image will be the cover image.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <Button type="button" onClick={handleImageUpload} disabled={images.length >= 10}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  {images.length >= 10 && (
                    <p className="mt-2 text-sm text-destructive">You've reached the maximum of 10 images.</p>
                  )}
                </div>

                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {images.map((image, index) => (
                      <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Property image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-6 w-6"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        {index === 0 && (
                          <div className="absolute bottom-0 left-0 right-0 bg-primary/80 p-1 text-center text-xs text-primary-foreground">
                            Cover Image
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Policies</CardTitle>
                <CardDescription>Set your cancellation policy and other rules.</CardDescription>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="cancellationPolicy"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cancellation Policy</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select policy" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="flexible">Flexible (Full refund 1 day prior to arrival)</SelectItem>
                          <SelectItem value="moderate">Moderate (Full refund 5 days prior to arrival)</SelectItem>
                          <SelectItem value="strict">Strict (50% refund up until 1 week prior to arrival)</SelectItem>
                          <SelectItem value="non-refundable">Non-refundable</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>This policy will be displayed to guests before they book.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" type="button" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <Card>
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={images[0] || "/placeholder.svg"}
                  alt={property.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardContent className="pt-6">
                <Tabs defaultValue="details" className="space-y-4">
                  <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="images">Images</TabsTrigger>
                    <TabsTrigger value="bookings">Bookings</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium">Description</h3>
                      <p className="mt-2 text-muted-foreground">{property.description}</p>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      <div className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                          <Home className="h-4 w-4 text-muted-foreground" />
                          Property Type
                        </div>
                        <div className="capitalize">{property.propertyType}</div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Bedrooms
                        </div>
                        <div>{property.bedrooms}</div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Bathrooms
                        </div>
                        <div>{property.bathrooms}</div>
                      </div>
                      <div className="rounded-lg border p-4">
                        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          Cancellation
                        </div>
                        <div className="capitalize">{property.cancellationPolicy}</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-2 text-lg font-medium">Amenities</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedAmenities.map((amenityId) => {
                          const amenity = amenities.find((a) => a.id === amenityId)
                          return amenity ? (
                            <Badge key={amenityId} variant="outline">
                              {amenity.label}
                            </Badge>
                          ) : null
                        })}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="images">
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square overflow-hidden rounded-md border">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Property image ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-primary/80 p-1 text-center text-xs text-primary-foreground">
                              Cover Image
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="bookings">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Recent Bookings</h3>
                        <Badge>{property.bookings} total</Badge>
                      </div>

                      {property.bookings > 0 ? (
                        <div className="space-y-4">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="flex items-center justify-between rounded-lg border p-4">
                              <div>
                                <div className="font-medium">Guest {i + 1}</div>
                                <div className="text-sm text-muted-foreground">
                                  {new Date(2025, 3 + i, 10 + i).toLocaleDateString()} -{" "}
                                  {new Date(2025, 3 + i, 15 + i).toLocaleDateString()}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className="bg-green-500">Confirmed</Badge>
                                <Link href={`/dashboard/bookings/${i + 1}`}>
                                  <Button size="sm" variant="outline">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full">
                            View All Bookings
                          </Button>
                        </div>
                      ) : (
                        <div className="rounded-lg border p-8 text-center">
                          <p className="text-muted-foreground">No bookings yet for this property.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="reviews">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Guest Reviews</h3>
                        <div className="flex items-center gap-2">
                          <Star className="h-5 w-5 text-amber-500" />
                          <span className="font-medium">{property.rating}</span>
                          <span className="text-muted-foreground">({property.reviews} reviews)</span>
                        </div>
                      </div>

                      {property.reviews > 0 ? (
                        <div className="space-y-4">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="rounded-lg border p-4">
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="h-8 w-8 rounded-full bg-muted"></div>
                                  <div className="font-medium">Guest {i + 1}</div>
                                </div>
                                <div className="flex items-center">
                                  {Array.from({ length: 5 }).map((_, starIndex) => (
                                    <Star
                                      key={starIndex}
                                      className={`h-4 w-4 ${
                                        starIndex < 5 - i * 0.5 ? "text-amber-500 fill-amber-500" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {i === 0
                                  ? "Amazing property! Very clean and exactly as described. Great location and the host was very responsive."
                                  : i === 1
                                    ? "Very comfortable stay. The property had all the amenities we needed and was in a great neighborhood. Would definitely stay again."
                                    : "Good experience overall. The property was clean and well-maintained. The host was helpful with local recommendations."}
                              </p>
                              <div className="mt-2 text-xs text-muted-foreground">
                                {new Date(2025, i, i + 10).toLocaleDateString()}
                              </div>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full">
                            View All Reviews
                          </Button>
                        </div>
                      ) : (
                        <div className="rounded-lg border p-8 text-center">
                          <p className="text-muted-foreground">No reviews yet for this property.</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Property Status</CardTitle>
                <CardDescription>Manage your property listing</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="font-medium">Status</div>
                  <Badge className="bg-green-500">Active</Badge>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-2 font-medium">Price</div>
                  <div className="text-2xl font-bold">
                    ${property.price}
                    <span className="text-sm font-normal text-muted-foreground">/night</span>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <div className="mb-2 font-medium">Statistics</div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Bookings</span>
                      <span>{property.bookings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Rating</span>
                      <div className="flex items-center">
                        <Star className="mr-1 h-4 w-4 text-amber-500" />
                        <span>{property.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reviews</span>
                      <span>{property.reviews}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Listed Since</span>
                      <span>{formatDate(property.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button className="w-full" variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Message Guests
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="mr-2 h-4 w-4" />
                  Manage Calendar
                </Button>
                <Button className="w-full" variant="destructive">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Property
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

