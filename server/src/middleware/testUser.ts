import type { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/index.js";
const testUserMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	if (req.user?.testUser) {
		throw new BadRequestError("Test user cannot perform this action");
	}
	next();
};
export default testUserMiddleware;
