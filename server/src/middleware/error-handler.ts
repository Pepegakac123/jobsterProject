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
			case "P2002": {
				const target = err.meta?.target as string;
				const field = target.split("_")[1];
				return res.status(StatusCodes.BAD_REQUEST).json({
					msg: `${field} already exists`,
				});
			}
			case "P2014":
				return res.status(StatusCodes.BAD_REQUEST).json({
					msg: "Invalid ID provided",
				});
			case "P2003":
				return res.status(StatusCodes.BAD_REQUEST).json({
					msg: "Invalid relation data provided",
				});
			case "P2025":
				return res.status(StatusCodes.NOT_FOUND).json({
					msg: "Record not found",
				});
			default:
				console.error("Prisma Error:", err);
				return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
					msg: "Database error occurred",
				});
		}
	}
	if (err instanceof Prisma.PrismaClientValidationError) {
		return res
			.status(StatusCodes.BAD_REQUEST)
			.json({ msg: "Database error validation occurred" });
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
