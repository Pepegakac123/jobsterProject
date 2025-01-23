import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { SearchQueryOptions, UserPayload } from "../types/index.js";
import { PrismaClient, type Prisma, type Status } from "@prisma/client";
const prisma = new PrismaClient();

export const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, 10);
};

export const generateToken = (userId: number, name: string): string => {
	const payload: UserPayload = { userId, name };
	const secret = process.env.JWT_SECRET as string;
	const lifetime = process.env.JWT_LIFETIME as string;

	return jwt.sign(payload, secret, {
		expiresIn: lifetime,
	});
};

export const comparePassword = async (
	password: string,
	hashedPassword: string,
): Promise<boolean> => {
	return await bcrypt.compare(password, hashedPassword);
};

export const buildWhereClause = (
	queryParams: SearchQueryOptions,
	userId: number,
) => {
	const { search, status, jobType } = queryParams;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	const where: any = {
		createdBy: userId,
	};
	// Dodawanie warunków wyszukiwania
	if (search) {
		where.OR = [
			{ position: { contains: String(search) } },
			{ company: { contains: String(search) } },
		];
	}

	// Dodawanie filtru statusu
	if (status && status !== "all") {
		where.status = status as Status; // Tu jest zmiana
	}

	if (jobType && jobType !== "all") {
		where.jobType = jobType;
	}
	return where;
};

export const buildOrderClause = (
	sort: string,
): Prisma.JobsOrderByWithRelationInput => {
	const orderBy: Prisma.JobsOrderByWithRelationInput = {};

	if (sort === "latest") {
		orderBy.createdAt = "desc";
	} else if (sort === "oldest") {
		orderBy.createdAt = "asc";
	} else if (sort === "a-z") {
		orderBy.position = "asc";
	} else if (sort === "z-a") {
		orderBy.position = "desc";
	}

	return orderBy;
};

export const getNumberOfApplicationsByMonths = async (userId: number) => {
	const fourMonthsAgo = new Date();
	fourMonthsAgo.setMonth(fourMonthsAgo.getMonth() - 4);

	const monthlyApplications = await prisma.jobs.findMany({
		where: {
			createdBy: userId,
			createdAt: {
				gte: fourMonthsAgo, // greater than or equal
			},
		},
		select: {
			createdAt: true,
		},
	});

	// Grupowanie po miesiącach w JavaScript
	const monthlyStats = monthlyApplications.reduce(
		(acc, { createdAt }) => {
			const monthKey = `${createdAt.getFullYear()}-${String(createdAt.getMonth() + 1).padStart(2, "0")}-01`;
			acc[monthKey] = (acc[monthKey] || 0) + 1;
			return acc;
		},
		{} as Record<string, number>,
	);

	// Konwersja na tablicę i sortowanie
	const results = Object.entries(monthlyStats)
		.map(([month, count]) => ({ month, count }))
		.sort((a, b) => a.month.localeCompare(b.month));

	return results;
};
export const getJobsByStatus = async (userId: number) => {
	const jobsByStatus = await prisma.jobs.groupBy({
		by: ["status"],
		_count: true,
		where: {
			createdBy: userId,
			status: { in: ["PENDING", "INTERVIEW", "REJECTED"] },
		},
	});
	return jobsByStatus.map((job) => ({
		status: job.status,
		count: job._count,
	}));
};
