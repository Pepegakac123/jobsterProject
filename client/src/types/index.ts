export interface UserInfo {
	email: string;
	lastName: string;
	location: string;
	name: string;
	token: string;
}

export type Status =
	| "PENDING"
	| "REJECTED"
	| "INTERVIEW"
	| "OFFER"
	| "ACCEPTED";
type JobStatus = Status | "all";
export type JobType =
	| "FULL_TIME"
	| "PART_TIME"
	| "INTERNSHIP"
	| "REMOTE"
	| "all";
export interface CreateJobInput {
	company: string;
	position: string;
	status: Status;
	jobType: JobType;
	jobLocation?: string;
}
export interface UpdateJobInput {
	id: number;
	company: string;
	position: string;
	status: Status;
	jobType: "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "REMOTE";
	jobLocation?: string;
}

export type QueryOptions = {
	status?: "PENDING" | "REJECTED" | "INTERVIEW" | "OFFER" | "ACCEPTED";
	search?: string;
	jobType?: string;
	sort?: string;
};

export interface SearchQueryOptions {
	search?: string;
	status?: JobStatus;
	sort?: "latest" | "oldest" | "a-z" | "z-a";
	jobType?: JobType;
	page?: string;
	limit?: string;
}

export type Jobs = {
	id: number;
	company: string;
	jobType: JobType;
	jobLocation: string;
	position: string;
	status: Status;
	createdBy: number;
	createdAt: string;
	updatedAt: string;
};
export interface JobsPayload {
	jobs: Jobs[];
	totalJobs: number;
	numOfPages: number;
	limit: number;
	page: number;
}

export interface StatsPayload {
	jobsByStatus: { status: Status; count: number }[];
	monthlyApplications: { month: string; count: number }[];
}
