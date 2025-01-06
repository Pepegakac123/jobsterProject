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
