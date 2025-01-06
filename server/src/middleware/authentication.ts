import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UnauthenticatedError } from "../errors/index.js";
import type { UserPayload } from "../types/index.ts";

const authenticateUser = async (
	req: Request,
	res: Response,
	next: NextFunction,
): Promise<void> => {
	const authHeader = req.headers.authorization;

	if (!authHeader?.startsWith("Bearer ")) {
		throw new UnauthenticatedError("Authentication Invalid");
	}

	const token = authHeader.split(" ")[1];

	try {
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET as string,
		) as UserPayload;
		req.user = { userId: payload.userId, name: payload.name };
		next();
	} catch (error) {
		throw new UnauthenticatedError("Authentication Invalid");
	}
};

export default authenticateUser;
