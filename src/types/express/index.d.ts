import { User } from "@prisma/client";

declare global {
	namespace Express {
		interface Request {
			user?: {
				userId: number;
				name: string;
			};
		}
	}
}
