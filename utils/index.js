import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const hashPassword = async (password) => {
	return await bcrypt.hash(password, 10);
};

export const generateToken = (userId, name) => {
	return jwt.sign({ userId, name }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_LIFETIME,
	});
};

export const comparePassword = async (password, hashedPassword) => {
	return await bcrypt.compare(password, hashedPassword);
};
