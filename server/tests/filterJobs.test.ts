import {
	describe,
	it,
	expect,
	beforeEach,
	afterAll,
	beforeAll,
	afterEach,
} from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import { PrismaClient } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
const prisma = new PrismaClient();

const TEST_USER = {
	name: "testUser",
	lastName: "testLastName",
	email: "test@test.com",
	password: "Test123!@#",
	location: "Test City",
};

const TEST_JOBS = {
	basic: [
		{
			company: "Dev Corp",
			position: "Frontend Developer",
			status: "PENDING" as const,
			jobType: "FULL_TIME" as const,
		},
		{
			company: "Tech Corp",
			position: "Backend Developer",
			status: "INTERVIEW" as const,
			jobType: "PART_TIME" as const,
		},
	],
	searchTest: [
		{
			company: "Search Corp",
			position: "React Developer",
			status: "PENDING" as const,
			jobType: "FULL_TIME" as const,
		},
		{
			company: "Find Me Corp",
			position: "Node Developer",
			status: "PENDING" as const,
			jobType: "FULL_TIME" as const,
		},
	],
	paginationTest: Array.from({ length: 7 }, (_, index) => ({
		company: `Company ${index}`,
		position: `Position ${index}`,
		status: "PENDING" as const,
		jobType: "FULL_TIME" as const,
	})),
};

// Helper do tworzenia jobów
const createTestJobs = async (jobs: typeof TEST_JOBS.basic, userId: number) => {
	return await prisma.jobs.createMany({
		data: jobs.map((job) => ({
			...job,
			createdBy: userId,
		})),
	});
};

describe("Testing jobs filtering", () => {
	let token: string;
	let userId: number;

	beforeAll(async () => {
		const response = await request(app)
			.post("/api/v1/auth/register")
			.send(TEST_USER);
		userId = response.body.user.userId;
		token = response.body.user.token;
	});

	afterEach(async () => {
		// Czyszczenie tylko jobów tego użytkownika
		await prisma.jobs.deleteMany({
			where: {
				createdBy: userId,
			},
		});
	});

	afterAll(async () => {
		// Usuwanie tylko testowych danych
		await prisma.jobs.deleteMany({
			where: {
				createdBy: userId,
			},
		});
		await prisma.user.deleteMany({
			where: {
				id: userId,
			},
		});
		await prisma.$disconnect();
	});
});
