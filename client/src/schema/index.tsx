import { z } from "zod";

export const registerFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(3, "Name must be at least 3 characters")
		.max(50, "Name too long"),

	lastName: z.string().trim().optional(),

	email: z
		.string()
		.trim()
		.email("Invalid email")
		.regex(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
			"Invalid email format",
		)
		.max(255),

	password: z
		.string()
		.trim()
		.min(6, "Password must be at least 6 characters")
		.regex(
			/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
			"Password must contain uppercase, number and special character",
		),
	location: z.string().trim().optional(),
});

export const updateProfileFormSchema = z.object({
	name: z
		.string()
		.trim()
		.min(3, "Name must be at least 3 characters")
		.max(50, "Name too long"),

	lastName: z.string().trim().optional(),

	email: z
		.string()
		.trim()
		.email("Invalid email")
		.regex(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
			"Invalid email format",
		)
		.max(255),
	location: z.string().trim().optional(),
});

export const loginFormSchema = z.object({
	email: z
		.string()
		.trim()
		.email("Invalid email")
		.regex(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
			"Invalid email format",
		)
		.max(255),

	password: z
		.string()
		.trim()
		.min(6, "Password must be at least 6 characters")
		.regex(
			/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
			"Password must contain uppercase, number and special character",
		),
});

export const createJobFormSchema = z.object({
	position: z
		.string()
		.trim()
		.min(3, "Position must be at least 3 characters")
		.max(50, "Position too long"),
	company: z
		.string()
		.trim()
		.min(3, "Company must be at least 3 characters")
		.max(50, "Company too long"),
	jobLocation: z.string().trim().default("my city"),
	status: z.enum(["PENDING", "REJECTED", "INTERVIEW", "OFFER", "ACCEPTED"]),
	jobType: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP", "REMOTE"]),
});

export const QueryJobsFormSchema = z.object({
	search: z.string().trim().optional(),
	jobStatus: z.enum([
		"PENDING",
		"REJECTED",
		"INTERVIEW",
		"OFFER",
		"ACCEPTED",
		"all",
	]),
	jobType: z.enum(["FULL_TIME", "PART_TIME", "INTERNSHIP", "REMOTE", "all"]),
	sort: z.enum(["latest", "oldest", "a-z", "z-a"]),
});
