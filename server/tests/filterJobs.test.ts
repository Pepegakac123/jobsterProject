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
import jwt from "jsonwebtoken";
import type { UserPayload } from "../src/types/index.js";
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
			company: "Find Me Devs",
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
console.log(TEST_JOBS.paginationTest);

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
		token = response.body.user.token;
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET as string,
		) as UserPayload;
		userId = payload.userId;
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

	describe("Filtering Jobs with correct data", async () => {
		it("should return all jobs", async () => {
			await createTestJobs(TEST_JOBS.basic, userId);
			const response = await request(app)
				.get("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(StatusCodes.OK);
			expect(response.body.jobs.length).toBe(2);
		});
		it("should return only one frontend jobs", async () => {
			await createTestJobs(TEST_JOBS.basic, userId);
			const response = await request(app)
				.get("/api/v1/jobs?search=frontend")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(StatusCodes.OK);
			expect(response.body.jobs.length).toBe(1);
			expect(response.body.jobs[0].position).toMatch(/frontend/i);
		});
		it("Should return only jobs with status PENDING and the word corp in company name", async () => {
			await createTestJobs(TEST_JOBS.basic, userId);
			await createTestJobs(TEST_JOBS.searchTest, userId);
			const response = await request(app)
				.get("/api/v1/jobs?status=PENDING&search=corp")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(StatusCodes.OK);
			expect(response.body.jobs.length).toBe(2);
			console.log(response.body.jobs);
			expect(response.body.jobs[0].company).toMatch(/corp/i);
			expect(response.body.jobs[1].company).toMatch(/corp/i);
		});
		it("Should return jobs first page,  with 2 pages total", async () => {
			await createTestJobs(TEST_JOBS.paginationTest, userId);
			const response = await request(app)
				.get("/api/v1/jobs?page=1&limit=5")
				.set("Authorization", `Bearer ${token}`);
			console.log("Ostatni Test response", response.body);
			expect(response.status).toBe(StatusCodes.OK);
			expect(response.body.page).toBe(1);
			expect(response.body.limit).toBe(5);
			expect(response.body.jobs.length).toBe(5);
			expect(response.body.numOfPages).toBe(2);
		});
	});
	describe("Filtering Jobs with invali data", () => {
		it("Should not return any jobs", async () => {
			await createTestJobs(TEST_JOBS.basic, userId);
			const response = await request(app)
				.get("/api/v1/jobs?search=react")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(StatusCodes.OK);
			expect(response.body.jobs.length).toBe(0);
		});
		it("Should not return any jobs", async () => {
			await createTestJobs(TEST_JOBS.basic, userId);
			const response = await request(app)
				.get("/api/v1/jobs?page=10&limit=5")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(StatusCodes.OK);
			expect(response.body.jobs.length).toBe(0);
		});
	});
});
