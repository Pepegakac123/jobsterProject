import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import {
	comparePassword,
	generateToken,
	hashPassword,
} from "../utils/index.js";
import { PrismaClient } from "@prisma/client";
import {
	registeredUserSchema,
	type UpdatedUser,
	UpdatedUserSchema,
	type RegisteredUser,
} from "../schema/User.js";
import type { LoginUserInput } from "../types/index.ts";

const prisma = new PrismaClient();

export const loginUser = async (req: Request, res: Response): Promise<void> => {
	const { email, password }: LoginUserInput = req.body;

	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}

	const user = await prisma.user.findUnique({ where: { email } });

	if (!user || !(await comparePassword(password, user.password))) {
		throw new UnauthenticatedError("Invalid Credentials");
	}
	const token = generateToken(user.id, user.name);
	res.status(StatusCodes.OK).json({
		user: {
			email: user.email,
			lastName: user.lastName,
			location: user.location,
			name: user.name,
			token,
		},
	});
};

export const registerUser = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const userData: RegisteredUser = registeredUserSchema.parse(req.body);
	const hashedPassword = await hashPassword(userData.password);

	const user = await prisma.user.create({
		data: {
			...userData,
			password: hashedPassword,
		},
	});

	const token = generateToken(user.id, user.name);
	res.status(StatusCodes.CREATED).json({
		user: {
			email: user.email,
			lastName: user.lastName,
			location: user.location,
			name: user.name,
			token,
		},
	});
};

export const updateUser = async (
	req: Request,
	res: Response,
): Promise<void> => {
	const userData: UpdatedUser = UpdatedUserSchema.parse(req.body);
	const { email, name, lastName, location } = userData;
	const userId = req.user?.userId;
	if (!userId) throw new BadRequestError("You must be logged in");

	if (email) {
		const existingUser = await prisma.user.findUnique({
			where: {
				email,
				NOT: { id: userId },
			},
		});
		if (existingUser) {
			throw new BadRequestError("Email already exists");
		}
	}

	const user = await prisma.user.update({
		where: { id: userId },
		data: { name, lastName, location, email },
	});

	const token = generateToken(user.id, user.name);

	res.status(StatusCodes.OK).json({
		user: {
			email: user.email,
			lastName: user.lastName,
			location: user.location,
			name: user.name,
			token,
		},
	});
};
