import type { Prisma, Status } from "@prisma/client";

export interface UserPayload {
	userId: number;
	name: string;
}

export interface RegisterUserInput {
	name: string;
	email: string;
	password: string;
}

export interface LoginUserInput {
	email: string;
	password: string;
}

export interface CreateJobInput {
	company: string;
	position: string;
	status: "PENDING" | "REJECTED" | "INTERVIEW" | "OFFER" | "ACCEPTED";
}

export type QueryOptions = {
	status?: "PENDING" | "REJECTED" | "INTERVIEW" | "OFFER" | "ACCEPTED";
	search?: string;
	jobType?: string;
	sort?: string;
};

type JobStatus = Status | "all";
type JobType = "FULL_TIME" | "PART_TIME" | "INTERNSHIP" | "REMOTE" | "all";
export interface SearchQueryOptions {
	search?: string;
	status?: JobStatus;
	sort?: "latest" | "oldest" | "a-z" | "z-a";
	jobType?: JobType;
	page?: string;
	limit?: string;
}
