import QueryJobsForm from "@/components/forms/QueryJobsForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SearchQueryOptions } from "@/types";
import { useState } from "react";
import { useGetJobsQuery } from "@/store/features/jobs/jobsApiSlice";
import Loading from "@/components/Loading";
import PaginationControls from "@/components/PaginationControls";
import { JobCard } from "@/components/JobCard";
import JobsLoading from "@/components/LoadingSkeletons/JobsLoading";

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
				<p className="capitalize font-bold">
					{jobs?.totalJobs ?? 0} jobs found
				</p>
				{isLoading ? (
					[1, 2, 3].map((item) => <JobsLoading key={item} />)
				) : (
					<div className="flex flex-col gap-4">
						{jobs?.jobs.map((job) => (
							<JobCard key={job.id} job={job} />
						))}
					</div>
				)}
			</section>

			{!isLoading && (
				<PaginationControls
					currentPage={Number(searchParams.page)}
					totalPages={Number(jobs?.numOfPages)}
					searchParams={searchParams}
					setSearchParams={setSearchParams}
				/>
			)}
		</>
	);
};

export default AllJobs;
