import { z } from "zod";

export const registeredUserSchema = z.object({
	name: z
		.string()
		.min(3, "Name must be at least 3 characters")
		.max(50, "Name too long"),

	email: z
		.string()
		.email("Invalid email")
		.regex(
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
			"Invalid email format",
		)
		.max(255),

	password: z
		.string()
		.min(6, "Password must be at least 6 characters")
		.regex(
			/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
			"Password must contain uppercase, number and special character",
		),
});

export type RegisteredUser = z.infer<typeof registeredUserSchema>;
