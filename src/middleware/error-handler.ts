import type { Request, Response, NextFunction } from "express";
import { CustomAPIError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { Prisma } from "@prisma/client";

export default function errorHandlerMiddleware(
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) {
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		switch (err.code) {
			case "P2002":
				return res.status(StatusCodes.BAD_REQUEST).json({
					msg: `${err.meta?.target} already exists`,
				});
			default:
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					message: "Database error occurred",
				});
		}
	}

	if (err instanceof z.ZodError) {
		const errorsMessages = err.issues.map((issue) => issue?.message).join(", ");
		return res.status(StatusCodes.BAD_REQUEST).json({ msg: errorsMessages });
	}

	if (err instanceof CustomAPIError) {
		return res.status(err.statusCode).json({ msg: err.message });
	}

	return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
}
