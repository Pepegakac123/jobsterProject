import { z } from "zod";

export const registeredUserSchema = z.object({
	name: z
		.string()
		.trim()
		.min(3, "Name must be at least 3 characters")
		.max(50, "Name too long"),
	lastName: z
		.string()
		.trim()
		.min(3, "Last name must be at least 3 characters")
		.max(50, "Last name too long"),

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
	location: z
		.string()
		.trim()
		.min(3, "Location must be at least 3 characters")
		.max(50, "Location too long"),
});

export const UpdatedUserSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be at least 3 characters")
		.max(50, "Name too long")
		.trim() // usuwa whitespace z początku i końca
		.refine((val) => val.length > 0, {
			message: "Name must have a value",
		}),
	lastName: z
		.string()
		.trim()
		.min(3, "Last name must be at least 3 characters")
		.max(50, "Last name too long")
		.trim() // usuwa whitespace z początku i końca
		.refine((val) => val.length > 0, {
			message: "Last Name must have a value",
		}),
	email: z
		.string()
		.trim()
		.email("Invalid email")
		.regex(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
			"Invalid email format",
		)
		.max(255),
	location: z
		.string()
		.trim()
		.min(3, "Location must be at least 3 characters")
		.max(50, "Location too long")
		.trim() // usuwa whitespace z początku i końca
		.refine((val) => val.length > 0, {
			message: "Location must have a value",
		}),
});

export type RegisteredUser = z.infer<typeof registeredUserSchema>;
export type UpdatedUser = z.infer<typeof UpdatedUserSchema>;
