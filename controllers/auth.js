import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnauthenticatedError } from "../errors/index.js";
import {
	comparePassword,
	generateToken,
	hashPassword,
} from "../utils/index.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
export const loginUser = async (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		throw new BadRequestError("Please provide email and password");
	}
	const user = await prisma.user.findUnique({
		where: {
			email,
		},
	});

	if (!user || !(await comparePassword(password, user.password))) {
		throw new UnauthenticatedError("Invalid Credentials");
	}
	const token = generateToken(user.id, user.name);

	res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
};

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
import { registeredUserSchema } from "../schema/User.js";
export const registerUser = async (req, res) => {
	const { name, email, password } = registeredUserSchema.parse(req.body);
	const hashedPassword = await hashPassword(password);
	const user = await prisma.user.create({
		data: {
			name,
			email,
			password: hashedPassword,
		},
	});
	const token = generateToken(user.id, user.name);

	res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};
