import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { SearchQueryOptions, UserPayload } from "../types/index.js";
import type { Prisma, Status } from "@prisma/client";

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
