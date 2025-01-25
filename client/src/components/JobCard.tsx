// JobCard.tsx
import { Card, CardContent } from "@/components/ui/card";

import { MdLocationCity } from "react-icons/md";
import { RiBriefcase4Fill } from "react-icons/ri";
import { IoCalendar } from "react-icons/io5";
import { GrStatusCriticalSmall } from "react-icons/gr";
import { toTitleCase, dateFormatter, colorConfig } from "@/utils";
import type { Jobs, UpdateJobInput } from "@/types";
import UpdateJobDialog from "./UpdateJobDialog";
import DeleteJobDialog from "./DeleteJobDialog";

interface JobCardProps {
	job: Jobs;
}

export const JobCard = ({ job }: JobCardProps) => {
	return (
		<Card className="w-full shadow-sm">
			<CardContent className="flex flex-col w-full p-4">
				<div className="w-full flex flex-row gap-4 justify-start border-b items-center pt-2 pb-4">
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
							<GrStatusCriticalSmall
								className={`text-xl ${colorConfig[job.status.toLowerCase() as keyof typeof colorConfig].text ?? "text-primary"} `}
							/>
							<p className="text-md capitalize">
								{toTitleCase(job.status).replace("_", " ")}
							</p>
						</div>
					</div>
				</div>
				<div className="flex flex-row gap-4 items-center justify-start w-full">
					<UpdateJobDialog job={job as UpdateJobInput} />
					<DeleteJobDialog id={job.id} />
				</div>
			</CardContent>
		</Card>
	);
};
