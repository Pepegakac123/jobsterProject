// testJob = {
//     company: "Vitest Company",
//     position: "Tester"
//   }

// {
//     "name": "vitest",
//     "email":"vitest2@mail.com",
//     "password": "kTx12KL#!"
// }

import { describe, it, expect, beforeEach, afterAll, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

describe("Jobs endpoints", () => {
	let token: string;
	let userId: number;

	// Przed wszystkimi testami
	beforeAll(async () => {
		// Najpierw czyścimy bazę
		await prisma.jobs.deleteMany();
		await prisma.user.deleteMany();

		// Tworzymy nowego użytkownika
		const response = await request(app).post("/api/v1/auth/register").send({
			name: "vitest",
			email: "vitest@mail.com",
			password: "kTx12KL#!",
		});

		token = response.body.token;
		userId = response.body.user.id;
	});

	// Przed każdym testem - czyścimy tylko jobs, nie użytkowników!
	beforeEach(async () => {
		await prisma.jobs.deleteMany();
	});

	// Po wszystkich testach
	afterAll(async () => {
		// Czyścimy wszystko
		await prisma.jobs.deleteMany();
		await prisma.user.deleteMany();
		await prisma.$disconnect();
	});
	describe("POST /api/v1/jobs", () => {
		it("should create a job - default status", async () => {
			const response = await request(app)
				.post("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`)
				.send({
					company: "Vitest Company",
					position: "Tester",
					createdBy: userId,
				});
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("company", "Vitest Company");
			expect(response.body).toHaveProperty("position", "Tester");
			expect(response.body).toHaveProperty("status", "PENDING");

			const job = await prisma.jobs.findFirst({
				where: { company: "Vitest Company" },
			});
			expect(job).not.toBeNull();
			expect(job?.position).toBe("Tester");
		});
		it("should create a job - non default status", async () => {
			const response = await request(app)
				.post("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`)
				.send({
					company: "Vitest Company",
					position: "Tester",
					status: "REJECTED",
					createdBy: userId,
				});
			expect(response.status).toBe(201);
			expect(response.body).toHaveProperty("company", "Vitest Company");
			expect(response.body).toHaveProperty("position", "Tester");
			expect(response.body).toHaveProperty("status", "REJECTED");

			const job = await prisma.jobs.findFirst({
				where: { company: "Vitest Company" },
			});
			expect(job).not.toBeNull();
			expect(job?.position).toBe("Tester");
		});
		it("Should throw database error if wrong status is provided", async () => {
			const response = await request(app)
				.post("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`)
				.send({
					company: "Vitest Company",
					position: "Tester",
					status: "WAITING",
					createdBy: userId,
				});
			console.log(response.body);
			expect(response.status).toBe(400);
			expect(response.body?.msg).toBe("Database error validation occurred");
		});
		it("should return 401 error if token not provided", async () => {
			const response = await request(app).post("/api/v1/jobs").send({
				company: "Vitest Company",
				position: "Tester",
				status: "WAITING",
				createdBy: userId,
			});

			expect(response.status).toBe(401);
			expect(response.body).toHaveProperty("msg", "Authentication Invalid");
		});

		it("Should throw 401 error if token invalid", async () => {
			const response = await request(app)
				.post("/api/v1/jobs")
				.set("Authorization", "Bearer invalid_token")
				.send({
					company: "Vitest Company",
					position: "Tester",
					status: "WAITING",
					createdBy: userId,
				});

			expect(response.status).toBe(401);
			expect(response.body).toHaveProperty("msg", "Authentication Invalid");
		});
		it("Should throw bad request error if the data is invalid", async () => {
			const response = await request(app)
				.post("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`)
				.send({
					company: "",
					status: "REJECTED",
					createdBy: userId,
				});
			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("msg");
			expect([
				"Company and position cannot be empty",
				"Please provide all values",
			]).toContain(response.body.msg);
		});
	});
	describe("GET /api/v1/jobs", () => {
		it("Should return zero jobs", async () => {
			const response = await request(app)
				.get("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			console.log(response.body);
			expect(response.body).toBeInstanceOf(Array);
			expect(response.body.length).toBe(0);
		});
		it("Should return all jobs", async () => {
			const job = await prisma.jobs.create({
				data: {
					company: "Vitest Company",
					position: "Tester",
					status: "PENDING",
					createdBy: userId,
				},
			});
			console.log(job);
			const response = await request(app)
				.get("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`);
			expect(response.status).toBe(200);
			console.log(response.body);
			expect(response.body).toBeInstanceOf(Array);
			expect(response.body.length).toBe(1);
		});
		it("Should throw 401 error if token invalid", async () => {
			const response = await request(app)
				.get("/api/v1/jobs")
				.set("Authorization", "Bearer invalid_token");
			expect(response.status).toBe(401);
			expect(response.body).toHaveProperty("msg", "Authentication Invalid");
		});
		it("Should throw 401 error if token not provided", async () => {
			const response = await request(app).get("/api/v1/jobs");
			expect(response.status).toBe(401);
			expect(response.body).toHaveProperty("msg", "Authentication Invalid");
		});
	});
});
