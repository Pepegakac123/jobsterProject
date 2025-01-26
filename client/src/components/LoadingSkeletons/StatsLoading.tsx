import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

// StatsBoxSkeleton.tsx
export const StatsBoxSkeleton = () => {
	return (
		<section className="flex flex-col items-center w-full gap-4 justify-start pt-6 pb-2">
			<div className="flex flex-row items-center justify-between w-full">
				<Skeleton className="h-12 w-24" /> {/* Liczba */}
				<Skeleton className="h-14 w-14 rounded-sm" /> {/* Ikona */}
			</div>
			<Skeleton className="h-6 w-32" /> {/* Tytuł */}
		</section>
	);
};

// StatsLoading.tsx
const StatsLoading = () => {
	return (
		<>
			<section className="w-[90%] mt-8 max-w-6xl xl:max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{[1, 2, 3].map((item) => (
					<Card
						key={item}
						className="w-full border-0 border-b-2 border-accepted p-0"
					>
						<CardContent>
							<StatsBoxSkeleton />
						</CardContent>
					</Card>
				))}
			</section>

			<section className="w-[90%] max-w-6xl xl:max-w-7xl mt-24 mx-auto flex flex-col items-center gap-6">
				<Skeleton className="h-8 w-48" /> {/* Tytuł wykresu */}
				<Skeleton className="h-6 w-96 text-center" /> {/* Podtytuł */}
				<Skeleton className="min-h-[200px] max-h-[400px] w-full aspect-[16/9]" />{" "}
				{/* Wykres */}
			</section>
		</>
	);
};

export default StatsLoading;
