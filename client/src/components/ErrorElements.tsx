// ErrorElements.tsx
import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function DashboardErrorElement() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<Card className="w-[90%] mx-auto mt-8 max-w-4xl">
				<CardHeader>
					<CardTitle>There was an Error {error.status}</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<p>{error.data?.message || error.statusText}</p>
					<Button asChild>
						<Link to="/dashboard">Go back to the dashboard</Link>
					</Button>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="w-[90%] mx-auto mt-8 max-w-4xl">
			<CardHeader>
				<CardTitle>Unexpected Error</CardTitle>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				<p>We are sorry, Something went wrong</p>
				<Button asChild>
					<Link to="/dashboard">Go Back to the dashboard</Link>
				</Button>
			</CardContent>
		</Card>
	);
}

export function RootErrorElement() {
	const error = useRouteError();

	if (isRouteErrorResponse(error)) {
		return (
			<section className="h-screen grid place-items-center">
				<Card className="w-[90%] max-w-md">
					<CardHeader>
						<CardTitle>Error {error.status}</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col gap-4">
						<p>{error.data?.message || error.statusText}</p>
						<Button asChild>
							<Link to="/">Go back to the homepage</Link>
						</Button>
					</CardContent>
				</Card>
			</section>
		);
	}

	return (
		<section className="h-screen grid place-items-center">
			<Card className="w-[90%] max-w-md">
				<CardHeader>
					<CardTitle>Unexpected Error</CardTitle>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<p>We are sorry, Something went wrong</p>
					<Button asChild>
						<Link to="/">Go back to the homepage</Link>
					</Button>
				</CardContent>
			</Card>
		</section>
	);
}
