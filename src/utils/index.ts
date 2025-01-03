import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { UserPayload } from "../types/index.js";

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
