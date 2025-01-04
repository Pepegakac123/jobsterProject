// @desc Get All Jobs
// @route GET /api/v1/jobs

import type { Request, Response } from "express";
import type { CreateJobInput } from "../types/index.js";
import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllJobs = (req: Request, res: Response) => {
	res.send("get all jobs");
};

// @desc Get Single Job
// @route GET /api/v1/jobs/:id
export const getSingleJob = (req: Request, res: Response) => {
	res.send("get single job");
};

// @desc Create Job
// @route POST /api/v1/jobs
export const createJob = async (req: Request, res: Response) => {
	const { company, position, status }: CreateJobInput = req.body;

	// Sprawdzamy czy pola nie są puste
	if (!company || !position) {
		throw new BadRequestError("Please provide all values");
	}

	// Sprawdzamy czy nie są to puste stringi lub same spacje
	if (company.trim() === "" || position.trim() === "") {
		throw new BadRequestError("Company and position cannot be empty");
	}
	if (!req.user?.userId) {
		throw new BadRequestError("You must be logged in");
	}
	const job = await prisma.jobs.create({
		data: {
			company,
			position,
			status: status || "PENDING",
			createdBy: req.user.userId,
		},
	});
	res.status(StatusCodes.CREATED).json(job);
};

// @desc Update Job
// @route PATCH /api/v1/jobs/:id
export const updateJob = (req: Request, res: Response) => {
	res.send("update job");
};

// @desc Delete Job
// @route DELETE /api/v1/jobs/:id
export const deleteJob = (req: Request, res: Response) => {
	res.send("delete job");
};
