import type { Request, Response } from "express";
import type {
	CreateJobInput,
	QueryOptions,
	SearchQueryOptions,
} from "../types/index.js";
import { StatusCodes } from "http-status-codes";
import {
	BadRequestError,
	NotFoundError,
	UnauthenticatedError,
} from "../errors/index.js";
import { PrismaClient, type Status } from "@prisma/client";
import { buildOrderClause, buildWhereClause } from "../utils/index.js";
const prisma = new PrismaClient();

export const getAllJobs = async (req: Request, res: Response) => {
	if (!req.user?.userId) {
		throw new BadRequestError("You must be logged in");
	}

	const {
		search,
		status,
		sort,
		jobType,
		page = "1",
		limit = "10",
	} = req.query as SearchQueryOptions;

	//Paginacja
	const currentPage = Math.max(1, Number(page));
	const pageSize = Math.max(1, Number(limit));
	const skip = (currentPage - 1) * pageSize;

	// Budowanie klauzuli where
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const where: any = buildWhereClause(
		{ search, status, jobType },
		req.user.userId,
	);
	const orderBy = buildOrderClause(sort as string);
	console.log("Where clause:", JSON.stringify(where, null, 2));
	// Pobieranie jobów z sortowaniem
	const [totalJobs, jobs] = await Promise.all([
		prisma.jobs.count({ where }), // całkowita liczba rekordów
		prisma.jobs.findMany({
			where,
			orderBy,
			skip,
			take: pageSize,
		}),
	]);
	const numOfPages = Math.ceil(totalJobs / pageSize);
	const queryValues = {
		...(search ? { search } : {}),
		...(status && status !== "all" ? { status } : {}),
		...(jobType && jobType !== "all" ? { jobType } : {}),
		...(sort ? { sort } : {}),
		page: currentPage,
		limit: pageSize,
	};

	res.status(StatusCodes.OK).json({
		...queryValues,
		numOfPages,
		totalJobs,
		jobs,
	});
};

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
	res.status(StatusCodes.OK).json({ job });
};

export const createJob = async (req: Request, res: Response) => {
	const { company, position, status }: CreateJobInput = req.body;

	if (!company || !position) {
		throw new BadRequestError("Please provide all values");
	}

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
	res.status(StatusCodes.CREATED).json({ job });
};

export const updateJob = async (req: Request, res: Response) => {
	const { id } = req.params;

	// Walidacja ID
	if (!id || Number.isNaN(Number.parseInt(id))) {
		throw new BadRequestError("Id must be an valid number");
	}

	// Walidacja użytkownika
	if (!req.user?.userId) {
		throw new BadRequestError("You must be logged in");
	}

	const { company, position, status }: Partial<CreateJobInput> = req.body;

	// Walidacja statusu przed próbą aktualizacji
	if (status) {
		const validStatuses = [
			"PENDING",
			"INTERVIEW",
			"REJECTED",
			"OFFER",
			"ACCEPTED",
		];
		if (!validStatuses.includes(status)) {
			throw new BadRequestError("Invalid status value");
		}
	}

	// Najpierw sprawdzamy czy job należy do użytkownika
	const existingJob = await prisma.jobs.findFirst({
		where: {
			id: Number.parseInt(id),
		},
	});

	if (!existingJob) {
		throw new NotFoundError("Job not found");
	}

	// Sprawdzamy czy job należy do użytkownika
	if (existingJob.createdBy !== req.user.userId) {
		throw new UnauthenticatedError("Not authorized to access this job");
	}

	// Walidacja niepustych pól
	if (company && company.trim() === "") {
		throw new BadRequestError("Company cannot be empty");
	}

	if (position && position.trim() === "") {
		throw new BadRequestError("Position cannot be empty");
	}

	// Przygotowanie danych do aktualizacji
	const updateData: Partial<CreateJobInput> = {};
	if (company) updateData.company = company;
	if (position) updateData.position = position;
	if (status) updateData.status = status;

	// Sprawdzamy czy jest co aktualizować
	if (Object.keys(updateData).length === 0) {
		throw new BadRequestError("Please provide at least one value to update");
	}

	// Aktualizacja
	const updatedJob = await prisma.jobs.update({
		where: {
			id: Number.parseInt(id),
			createdBy: req.user.userId,
		},
		data: updateData,
	});

	res.status(StatusCodes.OK).json({ job: updatedJob });
};

export const deleteJob = async (req: Request, res: Response) => {
	const { id } = req.params;
	if (!id || Number.isNaN(Number.parseInt(id))) {
		throw new BadRequestError("Id must be an valid number");
	}
	if (!req.user?.userId) {
		throw new BadRequestError("You must be logged in");
	}
	const existingJob = await prisma.jobs.findFirst({
		where: {
			id: Number.parseInt(id),
		},
	});

	if (!existingJob) {
		throw new NotFoundError("Job not found");
	}

	// Sprawdzamy czy job należy do użytkownika
	if (existingJob.createdBy !== req.user.userId) {
		throw new UnauthenticatedError("Not authorized to access this job");
	}
	const job = await prisma.jobs.delete({
		where: {
			id: Number.parseInt(id),
			createdBy: req.user.userId,
		},
	});
	res.status(StatusCodes.OK).json({ job });
};
