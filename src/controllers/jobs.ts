// @desc Get All Jobs
// @route GET /api/v1/jobs

import type { Request, Response } from "express";
import type { CreateJobInput } from "../types/index.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, NotFoundError } from "../errors/index.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export const getAllJobs = async (req: Request, res: Response) => {
	if (!req.user?.userId) {
		throw new BadRequestError("You must be logged in");
	}
	const jobs = await prisma.jobs.findMany({
		where: {
			createdBy: req.user.userId,
		},
	});
	res.status(StatusCodes.OK).json(jobs);
};

// @desc Get Single Job
// @route GET /api/v1/jobs/:id
export const getSingleJob = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id || Number.isNaN(Number.parseInt(id))) {
		throw new BadRequestError("Id must be an valid number");
	}
	if (!req.user?.userId) {
		throw new BadRequestError("You must be logged in");
	}
	const job = await prisma.jobs.findUnique({
		where: {
			id: Number.parseInt(id),
			createdBy: req.user.userId,
		},
	});
	if (!job) {
		throw new NotFoundError("Job not found");
	}
	res.status(StatusCodes.OK).json(job);
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
