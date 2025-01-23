import StatsBox from "@/components/StatsBox";
import { Card, CardContent } from "@/components/ui/card";
import {
	RiTimeLine, // Pending
	RiCloseLine, // Declined
	RiCheckLine, // Accepted
	RiTeamLine, // Interview
} from "react-icons/ri";
import { useGetStatsQuery } from "@/store/features/jobs/jobsApiSlice";
import Loading from "@/components/Loading";
import type { IconType } from "react-icons/lib";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
	type ChartConfig,
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
} from "@/components/ui/chart";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface IconConfig {
	[key: string]: IconType;
}

const iconConfig: IconConfig = {
	pending: RiTimeLine,
	rejected: RiCloseLine,
	interview: RiTeamLine,
};

const chartConfig = {
	applications: {
		label: "Number of jobs applied for ",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

const Stats = () => {
	const { data: stats, isLoading, error } = useGetStatsQuery();
	if (isLoading)
		return (
			<div>
				<Loading />
			</div>
		);
	if (error) return <div>We are experiencing some problems</div>;

	const transformedData = stats?.monthlyApplications.map((item) => ({
		month: new Date(item.month).toLocaleString("en-US", { month: "short" }),
		applications: item.count,
	}));

	return (
		<>
			<section className=" w-[90%] mt-8 max-w-6xl xl:max-w-7xl mx-auto  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
				{stats?.jobsByStatus.map((job) => {
					return (
						<Card
							key={job.status}
							className="w-full border-0 border-b-2 border-accepted p-0"
						>
							<CardContent>
								<StatsBox
									number={job.count.toString()}
									title={job.status}
									color={
										job.status.toLowerCase() as
											| "pending"
											| "rejected"
											| "interview"
									}
									icon={iconConfig[job.status.toLowerCase()]}
								/>
							</CardContent>
						</Card>
					);
				})}
			</section>
			<section className=" w-[90%] max-w-6xl xl:max-w-7xl mt-24 mx-auto flex flex-col items-center gap-6">
				<h2 className="text-xl font-bold">Monthly Applications</h2>
				<h3 className="text-2xl font-bold text-chart-2 text-center">
					Area Chart For Last 6 Months
				</h3>

				<ChartContainer
					config={chartConfig}
					className="min-h-[200px] max-h-[400px] w-full flex justify-center aspect-[16/9]"
					style={{ margin: "auto" }}
				>
					<BarChart
						data={transformedData}
						margin={{ top: 10, right: 10, bottom: 10, left: 10 }}
					>
						<CartesianGrid vertical={false} />
						<XAxis dataKey="month" />
						<YAxis dataKey="applications" allowDecimals={false} />
						<ChartTooltip content={<ChartTooltipContent nameKey="month" />} />
						<ChartLegend content={<ChartLegendContent />} />
						<Bar
							dataKey="applications"
							fill="var(--color-applications)"
							radius={4}
						/>
					</BarChart>
				</ChartContainer>
			</section>
		</>
	);
};
export default Stats;
