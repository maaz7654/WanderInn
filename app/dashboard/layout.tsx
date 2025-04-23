"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Home, LogOut, Menu, Search, Settings, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import {
	SidebarProvider,
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarTrigger,
} from "@/components/ui/sidebar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();
	const [notifications, setNotifications] = useState(3);

	return (
		<SidebarProvider>
			<div className="flex min-h-screen">
				<Sidebar>
					<SidebarHeader>
						<div className="flex items-center gap-2 px-2">
							<Home className="h-6 w-6" />
							<span className="font-bold">WanderInn</span>
						</div>
					</SidebarHeader>
					<SidebarContent>
						<SidebarGroup>
							<SidebarGroupLabel>Dashboard</SidebarGroupLabel>
							<SidebarGroupContent>
								<SidebarMenu>
									<SidebarMenuItem>
										<SidebarMenuButton
											asChild
											isActive={pathname === "/dashboard"}
										>
											<Link href="/dashboard">
												<Home className="h-4 w-4" />
												<span>Overview</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											asChild
											isActive={pathname === "/dashboard/bookings"}
										>
											<Link href="/dashboard/bookings">
												<Search className="h-4 w-4" />
												<span>My Bookings</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											asChild
											isActive={pathname === "/dashboard/properties"}
										>
											<Link href="/dashboard/properties">
												<Home className="h-4 w-4" />
												<span>My Properties</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
									<SidebarMenuItem>
										<SidebarMenuButton
											asChild
											isActive={pathname === "/dashboard/settings"}
										>
											<Link href="/dashboard/settings">
												<Settings className="h-4 w-4" />
												<span>Settings</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								</SidebarMenu>
							</SidebarGroupContent>
						</SidebarGroup>
					</SidebarContent>
					<SidebarFooter>
						<SidebarMenu>
							<SidebarMenuItem>
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<SidebarMenuButton>
											<User className="h-4 w-4" />
											<span>John Doe</span>
										</SidebarMenuButton>
									</DropdownMenuTrigger>
									<DropdownMenuContent
										side="top"
										align="start"
										className="w-56"
									>
										<DropdownMenuLabel>My Account</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<User className="mr-2 h-4 w-4" />
											<span>Profile</span>
										</DropdownMenuItem>
										<DropdownMenuItem>
											<Settings className="mr-2 h-4 w-4" />
											<span>Settings</span>
										</DropdownMenuItem>
										<DropdownMenuSeparator />
										<DropdownMenuItem>
											<LogOut className="mr-2 h-4 w-4" />
											<span>Log out</span>
										</DropdownMenuItem>
									</DropdownMenuContent>
								</DropdownMenu>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarFooter>
				</Sidebar>
				<div className="flex flex-1 flex-col">
					<header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
						<SidebarTrigger />
						<div className="w-full flex-1">
							<form>
								<div className="relative">
									<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
									<input
										type="search"
										placeholder="Search..."
										className="w-full rounded-md border border-input bg-background py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:w-[300px] lg:w-[400px]"
									/>
								</div>
							</form>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline" size="icon" className="relative">
									<Bell className="h-4 w-4" />
									{notifications > 0 && (
										<span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
											{notifications}
										</span>
									)}
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuLabel>Notifications</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<div className="max-h-[300px] overflow-auto">
									{notifications > 0 ? (
										Array.from({ length: notifications }).map((_, i) => (
											<DropdownMenuItem
												key={i}
												className="flex flex-col items-start"
											>
												<div className="font-medium">New booking request</div>
												<div className="text-sm text-muted-foreground">
													You have a new booking request for your property.
												</div>
											</DropdownMenuItem>
										))
									) : (
										<div className="p-4 text-center text-sm text-muted-foreground">
											No new notifications
										</div>
									)}
								</div>
							</DropdownMenuContent>
						</DropdownMenu>
						<Sheet>
							<SheetTrigger asChild>
								<Button variant="ghost" size="icon" className="md:hidden">
									<Menu className="h-5 w-5" />
									<span className="sr-only">Toggle menu</span>
								</Button>
							</SheetTrigger>
							<SheetContent side="right">
								<SheetHeader>
									<SheetTitle>Menu</SheetTitle>
									<SheetDescription>Navigation and actions</SheetDescription>
								</SheetHeader>
								<nav className="flex flex-col gap-4 pt-6">
									<Link
										href="/dashboard"
										className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
									>
										Overview
									</Link>
									<Link
										href="/dashboard/bookings"
										className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
									>
										My Bookings
									</Link>
									<Link
										href="/dashboard/properties"
										className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
									>
										My Properties
									</Link>
									<Link
										href="/dashboard/settings"
										className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
									>
										Settings
									</Link>
								</nav>
							</SheetContent>
						</Sheet>
					</header>
					<main className="flex-1 p-6">{children}</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
