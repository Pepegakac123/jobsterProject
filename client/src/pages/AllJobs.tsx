import QueryJobsForm from "@/components/forms/QueryJobsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SearchQueryOptions } from "@/types";
import { useState } from "react";
import { useGetJobsQuery } from "@/store/features/jobs/jobsApiSlice";
import Loading from "@/components/Loading";
import { dateFormatter, toTitleCase } from "@/utils";
import { MdLocationCity } from "react-icons/md";
import { RiBriefcase4Fill } from "react-icons/ri";
import { IoCalendar } from "react-icons/io5";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { Button } from "@/components/ui/button";

const AllJobs = () => {
	const [searchParams, setSearchParams] = useState<SearchQueryOptions>({
		search: "",
		status: "all",
		jobType: "all",
		sort: "latest",
		page: "1",
		limit: "10",
	});

	const { data: jobs, isLoading } = useGetJobsQuery(searchParams);
	if (isLoading) return <Loading />;
	return (
		<>
			<Card className="w-[90%] mx-auto mt-8 max-w-4xl shadow-animate-primary">
				<CardHeader>
					<CardTitle>Search Jobs</CardTitle>
				</CardHeader>
				<CardContent>
					<QueryJobsForm onSearch={setSearchParams} />
				</CardContent>
			</Card>

			<section className="w-[90%] mx-auto mt-8 max-w-4xl flex flex-col gap-4 flex-start">
				<p className="capitalize font-bold">{jobs?.totalJobs} jobs found</p>
				{jobs?.jobs.map((job) => {
					return (
						<Card key={job.id} className="w-full shadow-sm">
							<CardContent className="flex flex-col w-full p-4">
								<div className=" w-full flex flex-row gap-4 justify-start border-b items-center pt-2 pb-4">
									<span className="py-2 px-4 rounded-md bg-primary text-2xl font-extrabold shadow-sm shadow-zinc-800">
										{job.company.charAt(0)}
									</span>
									<div className="flex flex-col gap-2">
										<p className="text-sm">{toTitleCase(job.position)}</p>
										<p className="text-zinc-400 text-xs">{job.company}</p>
									</div>
								</div>
								<div className="w-full grid grid-cols-2 gap-4 py-4">
									<div className="flex flex-col gap-6 items-start">
										<div className="flex flex-row gap-2 items-center justify-center">
											<MdLocationCity className="text-primary text-xl" />
											<p className="text-md capitalize">{job.jobLocation}</p>
										</div>
										<div className="flex flex-row gap-2 items-center justify-center">
											<RiBriefcase4Fill className="text-primary text-xl" />
											<p className="text-md capitalize">
												{toTitleCase(job.jobType).replace("_", " ")}
											</p>
										</div>
									</div>
									<div className="flex flex-col gap-6 items-start">
										<div className="flex flex-row gap-4 items-center justify-center">
											<IoCalendar className="text-primary text-xl" />
											<p className="text-md capitalize">
												{dateFormatter(job.createdAt)}
											</p>
										</div>
										<div className="flex flex-row gap-2 items-center justify-center">
											<GrStatusCriticalSmall className="text-primary text-xl" />
											<p className="text-md capitalize">
												{toTitleCase(job.status).replace("_", " ")}
											</p>
										</div>
									</div>
								</div>
								<div className="flex flex-row gap-4 items-center justify-start w-full">
									<Button
										type="button"
										className="w-fit text-sm font-bold shadow-md shadow-primary/40"
									>
										Edit
									</Button>
									<Button
										type="button"
										className="w-fit text-sm font-bold bg-destructive text-destructive-foreground hover:bg-destructive/80 shadow-md shadow-destructive/40"
									>
										Delete
									</Button>
								</div>
							</CardContent>
						</Card>
					);
				})}
			</section>
		</>
	);
};
export default AllJobs;
