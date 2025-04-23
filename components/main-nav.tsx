import Link from "next/link";
import { Home, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

export function MainNav() {
	return (
		<div className="flex items-center gap-6 md:gap-10">
			<Link href="/" className="flex items-center space-x-2">
				<Home className="h-6 w-6" />
				<span className="hidden font-bold sm:inline-block">WanderInn</span>
			</Link>
			<nav className="hidden gap-6 md:flex">
				<Link
					href="/properties"
					className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
				>
					Properties
				</Link>
				<Link
					href="/destinations"
					className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
				>
					Destinations
				</Link>
				<Link
					href="/hosts"
					className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
				>
					Become a Host
				</Link>
			</nav>
			<div className="hidden md:flex md:flex-1 md:justify-center">
				<div className="relative w-full max-w-sm">
					<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
					<input
						type="search"
						placeholder="Search destinations..."
						className="w-full rounded-full border bg-background py-2 pl-8 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					/>
				</div>
			</div>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="ghost" size="icon" className="md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<SheetHeader>
						<SheetTitle>WanderInn</SheetTitle>
						<SheetDescription>Find your perfect stay</SheetDescription>
					</SheetHeader>
					<nav className="flex flex-col gap-4 pt-6">
						<Link
							href="/properties"
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
						>
							Properties
						</Link>
						<Link
							href="/destinations"
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
						>
							Destinations
						</Link>
						<Link
							href="/hosts"
							className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
						>
							Become a Host
						</Link>
						<div className="relative w-full">
							<Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
							<input
								type="search"
								placeholder="Search destinations..."
								className="w-full rounded-md border bg-background py-2 pl-8 pr-4 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							/>
						</div>
					</nav>
				</SheetContent>
			</Sheet>
		</div>
	);
}
