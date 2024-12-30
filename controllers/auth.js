import { StatusCodes } from "http-status-codes";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// @desc Login user
// @route POST /api/v1/auth/login
// @access Public
export const loginUser = (req, res) => {
	res.send("login user");
};

// @desc Register user
// @route POST /api/v1/auth/register
// @access Public
import { registeredUserSchema } from "../schema/User.js";
import { generateToken, hashPassword } from "../utils/index.js";
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
