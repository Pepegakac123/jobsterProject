import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "../ui/card";

const JobsLoading = () => {
	return (
		<Card className="w-full shadow-sm">
			<CardContent className="flex flex-col w-full p-4">
				{/* Górna część z logo i danymi firmy */}
				<div className="w-full flex flex-row gap-4 justify-start border-b items-center pt-2 pb-4">
					<Skeleton className="h-12 w-12 rounded-md" /> {/* Logo firmy */}
					<div className="flex flex-col gap-2">
						<Skeleton className="h-4 w-32" /> {/* Nazwa stanowiska */}
						<Skeleton className="h-3 w-24" /> {/* Nazwa firmy */}
					</div>
				</div>

				{/* Grid z informacjami */}
				<div className="w-full grid grid-cols-2 gap-4 py-4">
					<div className="flex flex-col gap-6 items-start">
						<div className="flex flex-row gap-2 items-center">
							<Skeleton className="h-6 w-6" /> {/* Ikona lokalizacji */}
							<Skeleton className="h-4 w-24" /> {/* Tekst lokalizacji */}
						</div>
						<div className="flex flex-row gap-2 items-center">
							<Skeleton className="h-6 w-6" /> {/* Ikona typu pracy */}
							<Skeleton className="h-4 w-24" /> {/* Tekst typu pracy */}
						</div>
					</div>
					<div className="flex flex-col gap-6 items-start">
						<div className="flex flex-row gap-2 items-center">
							<Skeleton className="h-6 w-6" /> {/* Ikona kalendarza */}
							<Skeleton className="h-4 w-24" /> {/* Data */}
						</div>
						<div className="flex flex-row gap-2 items-center">
							<Skeleton className="h-6 w-6" /> {/* Ikona statusu */}
							<Skeleton className="h-4 w-24" /> {/* Tekst statusu */}
						</div>
					</div>
				</div>

				{/* Przyciski */}
				<div className="flex flex-row gap-4 items-center justify-start w-full">
					<Skeleton className="h-8 w-16" /> {/* Przycisk Edit */}
					<Skeleton className="h-8 w-16" /> {/* Przycisk Delete */}
				</div>
			</CardContent>
		</Card>
		// <div className="flex flex-col space-y-3">
		// 	<Skeleton className="h-[125px] w-[250px] rounded-xl" />
		// 	<div className="space-y-2">
		// 		<Skeleton className="h-4 w-[250px]" />
		// 		<Skeleton className="h-4 w-[200px]" />
		// 	</div>
		// </div>
	);
};

export default JobsLoading;
