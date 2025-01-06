// /src/middleware/not-found.ts
import type { Request, Response, NextFunction } from "express";

export default function notFoundMiddleware(
	req: Request,
	res: Response,
	next: NextFunction,
) {
	res.status(404).send("Route does not exist");
}
