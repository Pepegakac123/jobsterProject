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
