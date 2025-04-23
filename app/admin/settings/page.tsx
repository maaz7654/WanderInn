"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Check } from "lucide-react";

const platformFormSchema = z.object({
	siteName: z.string().min(2, {
		message: "Site name must be at least 2 characters.",
	}),
	siteDescription: z.string().max(500, {
		message: "Site description must not exceed 500 characters.",
	}),
	contactEmail: z.string().email({
		message: "Please enter a valid email address.",
	}),
	supportPhone: z.string().optional(),
	maintenanceMode: z.boolean(),
});

const bookingFormSchema = z.object({
	commissionRate: z
		.string()
		.refine(
			(val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100,
			{
				message: "Commission rate must be a number between 0 and 100.",
			}
		),
	serviceFeePercentage: z
		.string()
		.refine(
			(val) => !isNaN(Number(val)) && Number(val) >= 0 && Number(val) <= 100,
			{
				message: "Service fee percentage must be a number between 0 and 100.",
			}
		),
	minBookingDays: z
		.string()
		.refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
			message: "Minimum booking days must be a positive number.",
		}),
	maxBookingDays: z
		.string()
		.refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
			message: "Maximum booking days must be a positive number.",
		}),
	instantBooking: z.boolean(),
	requireVerification: z.boolean(),
});

const securityFormSchema = z.object({
	userVerification: z.boolean(),
	twoFactorAuth: z.boolean(),
	loginAttempts: z
		.string()
		.refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
			message: "Login attempts must be a positive number.",
		}),
	sessionTimeout: z
		.string()
		.refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
			message: "Session timeout must be a positive number.",
		}),
});

type PlatformFormValues = z.infer<typeof platformFormSchema>;
type BookingFormValues = z.infer<typeof bookingFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;

export default function AdminSettingsPage() {
	const [successMessage, setSuccessMessage] = useState<string | null>(null);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const platformForm = useForm<PlatformFormValues>({
		resolver: zodResolver(platformFormSchema),
		defaultValues: {
			siteName: "WanderInn",
			siteDescription:
				"Find and book your perfect stay from our collection of properties.",
			contactEmail: "admin@wanderinn.com",
			supportPhone: "+1 (555) 123-4567",
			maintenanceMode: false,
		},
	});

	const bookingForm = useForm<BookingFormValues>({
		resolver: zodResolver(bookingFormSchema),
		defaultValues: {
			commissionRate: "10",
			serviceFeePercentage: "12",
			minBookingDays: "1",
			maxBookingDays: "90",
			instantBooking: true,
			requireVerification: true,
		},
	});

	const securityForm = useForm<SecurityFormValues>({
		resolver: zodResolver(securityFormSchema),
		defaultValues: {
			userVerification: true,
			twoFactorAuth: false,
			loginAttempts: "5",
			sessionTimeout: "60",
		},
	});

	function onPlatformSubmit(data: PlatformFormValues) {
		setSuccessMessage("Platform settings updated successfully!");
		setErrorMessage(null);
		console.log(data);

		// Clear success message after 3 seconds
		setTimeout(() => {
			setSuccessMessage(null);
		}, 3000);
	}

	function onBookingSubmit(data: BookingFormValues) {
		setSuccessMessage("Booking settings updated successfully!");
		setErrorMessage(null);
		console.log(data);

		// Clear success message after 3 seconds
		setTimeout(() => {
			setSuccessMessage(null);
		}, 3000);
	}

	function onSecuritySubmit(data: SecurityFormValues) {
		setSuccessMessage("Security settings updated successfully!");
		setErrorMessage(null);
		console.log(data);

		// Clear success message after 3 seconds
		setTimeout(() => {
			setSuccessMessage(null);
		}, 3000);
	}

	return (
		<div className="flex flex-col gap-6">
			<div>
				<h2 className="text-3xl font-bold tracking-tight">Admin Settings</h2>
				<p className="text-muted-foreground">
					Configure platform-wide settings and preferences.
				</p>
			</div>

			{successMessage && (
				<Alert className="bg-green-50 border-green-500 text-green-700">
					<Check className="h-4 w-4 text-green-500" />
					<AlertTitle>Success</AlertTitle>
					<AlertDescription>{successMessage}</AlertDescription>
				</Alert>
			)}

			{errorMessage && (
				<Alert variant="destructive">
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>Error</AlertTitle>
					<AlertDescription>{errorMessage}</AlertDescription>
				</Alert>
			)}

			<Tabs defaultValue="platform" className="space-y-4">
				<TabsList>
					<TabsTrigger value="platform">Platform</TabsTrigger>
					<TabsTrigger value="booking">Booking</TabsTrigger>
					<TabsTrigger value="security">Security</TabsTrigger>
				</TabsList>

				<TabsContent value="platform">
					<Card>
						<CardHeader>
							<CardTitle>Platform Settings</CardTitle>
							<CardDescription>
								Configure general platform settings and information.
							</CardDescription>
						</CardHeader>
						<Form {...platformForm}>
							<form onSubmit={platformForm.handleSubmit(onPlatformSubmit)}>
								<CardContent className="space-y-6">
									<FormField
										control={platformForm.control}
										name="siteName"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Site Name</FormLabel>
												<FormControl>
													<Input {...field} />
												</FormControl>
												<FormDescription>
													This is the name of your platform that will be
													displayed to users.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<FormField
										control={platformForm.control}
										name="siteDescription"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Site Description</FormLabel>
												<FormControl>
													<Textarea
														placeholder="Enter a brief description of your platform"
														className="resize-none"
														{...field}
													/>
												</FormControl>
												<FormDescription>
													This description will be used in meta tags and for SEO
													purposes.
												</FormDescription>
												<FormMessage />
											</FormItem>
										)}
									/>

									<div className="grid gap-6 sm:grid-cols-2">
										<FormField
											control={platformForm.control}
											name="contactEmail"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Contact Email</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormDescription>
														Public contact email for your platform.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={platformForm.control}
											name="supportPhone"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Support Phone</FormLabel>
													<FormControl>
														<Input {...field} />
													</FormControl>
													<FormDescription>
														Optional support phone number.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={platformForm.control}
										name="maintenanceMode"
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
												<div className="space-y-0.5">
													<FormLabel className="text-base">
														Maintenance Mode
													</FormLabel>
													<FormDescription>
														When enabled, the site will display a maintenance
														message to all users except admins.
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter className="flex justify-end">
									<Button type="submit">Save Platform Settings</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</TabsContent>

				<TabsContent value="booking">
					<Card>
						<CardHeader>
							<CardTitle>Booking Settings</CardTitle>
							<CardDescription>
								Configure settings related to bookings and reservations.
							</CardDescription>
						</CardHeader>
						<Form {...bookingForm}>
							<form onSubmit={bookingForm.handleSubmit(onBookingSubmit)}>
								<CardContent className="space-y-6">
									<div className="grid gap-6 sm:grid-cols-2">
										<FormField
											control={bookingForm.control}
											name="commissionRate"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Host Commission Rate (%)</FormLabel>
													<FormControl>
														<Input type="number" min="0" max="100" {...field} />
													</FormControl>
													<FormDescription>
														Percentage commission charged to hosts for each
														booking.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={bookingForm.control}
											name="serviceFeePercentage"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Guest Service Fee (%)</FormLabel>
													<FormControl>
														<Input type="number" min="0" max="100" {...field} />
													</FormControl>
													<FormDescription>
														Percentage service fee charged to guests for each
														booking.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="grid gap-6 sm:grid-cols-2">
										<FormField
											control={bookingForm.control}
											name="minBookingDays"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Minimum Booking Days</FormLabel>
													<FormControl>
														<Input type="number" min="1" {...field} />
													</FormControl>
													<FormDescription>
														Minimum number of days for a booking.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={bookingForm.control}
											name="maxBookingDays"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Maximum Booking Days</FormLabel>
													<FormControl>
														<Input type="number" min="1" {...field} />
													</FormControl>
													<FormDescription>
														Maximum number of days for a booking.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<FormField
										control={bookingForm.control}
										name="instantBooking"
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
												<div className="space-y-0.5">
													<FormLabel className="text-base">
														Instant Booking
													</FormLabel>
													<FormDescription>
														Allow guests to book instantly without host
														approval.
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={bookingForm.control}
										name="requireVerification"
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
												<div className="space-y-0.5">
													<FormLabel className="text-base">
														Require User Verification
													</FormLabel>
													<FormDescription>
														Require users to verify their identity before
														booking.
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter className="flex justify-end">
									<Button type="submit">Save Booking Settings</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</TabsContent>

				<TabsContent value="security">
					<Card>
						<CardHeader>
							<CardTitle>Security Settings</CardTitle>
							<CardDescription>
								Configure platform security settings and policies.
							</CardDescription>
						</CardHeader>
						<Form {...securityForm}>
							<form onSubmit={securityForm.handleSubmit(onSecuritySubmit)}>
								<CardContent className="space-y-6">
									<FormField
										control={securityForm.control}
										name="userVerification"
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
												<div className="space-y-0.5">
													<FormLabel className="text-base">
														User Verification
													</FormLabel>
													<FormDescription>
														Require email verification for new user
														registrations.
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<FormField
										control={securityForm.control}
										name="twoFactorAuth"
										render={({ field }) => (
											<FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
												<div className="space-y-0.5">
													<FormLabel className="text-base">
														Two-Factor Authentication
													</FormLabel>
													<FormDescription>
														Require two-factor authentication for admin
														accounts.
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
											</FormItem>
										)}
									/>

									<div className="grid gap-6 sm:grid-cols-2">
										<FormField
											control={securityForm.control}
											name="loginAttempts"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Max Login Attempts</FormLabel>
													<FormControl>
														<Input type="number" min="1" {...field} />
													</FormControl>
													<FormDescription>
														Maximum number of failed login attempts before
														account lockout.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>

										<FormField
											control={securityForm.control}
											name="sessionTimeout"
											render={({ field }) => (
												<FormItem>
													<FormLabel>Session Timeout (minutes)</FormLabel>
													<FormControl>
														<Input type="number" min="1" {...field} />
													</FormControl>
													<FormDescription>
														Time in minutes before an inactive session expires.
													</FormDescription>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>

									<div className="rounded-lg border p-4">
										<h3 className="text-base font-medium">
											Data Retention Policy
										</h3>
										<p className="mt-1 text-sm text-muted-foreground">
											Configure how long user data is retained after account
											deletion.
										</p>
										<Select defaultValue="30">
											<SelectTrigger className="mt-4 w-full sm:w-[240px]">
												<SelectValue placeholder="Select retention period" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="7">7 days</SelectItem>
												<SelectItem value="30">30 days</SelectItem>
												<SelectItem value="90">90 days</SelectItem>
												<SelectItem value="180">180 days</SelectItem>
												<SelectItem value="365">1 year</SelectItem>
											</SelectContent>
										</Select>
									</div>

									<div className="rounded-lg border p-4">
										<h3 className="text-base font-medium">API Access</h3>
										<p className="mt-1 text-sm text-muted-foreground">
											Manage API access and generate API keys for third-party
											integrations.
										</p>
										<Button variant="outline" className="mt-4">
											Manage API Keys
										</Button>
									</div>
								</CardContent>
								<CardFooter className="flex justify-end">
									<Button type="submit">Save Security Settings</Button>
								</CardFooter>
							</form>
						</Form>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
