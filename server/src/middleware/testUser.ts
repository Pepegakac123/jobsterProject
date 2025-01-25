import type { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/index.js";
const testUserMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.user?.testUser) {
		throw new UnauthenticatedError("Test user cannot perform this action");
	}
	next();
};
export default testUserMiddleware;
