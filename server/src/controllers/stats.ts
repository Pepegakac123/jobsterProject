import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { PrismaClient, type Status } from "@prisma/client";
import {
	getJobsByStatus,
	getNumberOfApplicationsByMonths,
} from "../utils/index.js";
import BadRequestError from "../errors/bad-request.js";
const prisma = new PrismaClient();

interface Stats {
	jobsByStatus: { status: Status; count: number }[];
	monthlyApplications: { month: string; count: number }[];
}
const getAllStats = async (req: Request, res: Response) => {
	if (!req.user?.userId) {
		throw new BadRequestError("You must be logged in");
	}
	const stats: Stats = {
		jobsByStatus: [],
		monthlyApplications: [],
	};

	stats.jobsByStatus = await getJobsByStatus(req.user?.userId);
	stats.monthlyApplications = await getNumberOfApplicationsByMonths(
		req.user?.userId,
	);
	res.status(StatusCodes.OK).json(stats);
};

export default getAllStats;
