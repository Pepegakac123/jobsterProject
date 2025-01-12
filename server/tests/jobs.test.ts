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

// Stałe testowe
const TEST_USER = {
	name: "jobsTestUser",
	lastName: "testLastName",
	email: "jobsTest@test.com",
	password: "Test123!@#",
	location: "Test City",
};

const DEFAULT_TEST_USER_TOKEN = "Bearer DEFAULT_TEST_USER_TOKEN";

// Drugi użytkownik do testów autoryzacji
const OTHER_TEST_USER = {
	name: "otherTestUser",
	lastName: "testLastName",
	email: "otherJobsTest@test.com",
	password: "Test123!@#",
	location: "Test City",
};

const TEST_JOBS = {
	valid: {
		basic: {
			company: "Test Company",
			position: "Test Position",
		},
		withStatus: {
			company: "Test Company",
			position: "Test Position",
			status: "INTERVIEW" as const,
		},
		updated: {
			company: "Updated Company",
			position: "Updated Position",
			status: "OFFER" as const,
		},
	},
	invalid: {
		emptyCompany: {
			company: "",
			position: "Test Position",
		},
		invalidStatus: {
			company: "Test Company",
			position: "Test Position",
			status: "INVALID_STATUS",
		},
	},
};

describe("Jobs API", () => {
	let token: string;
	let userId: number;
	let otherUserToken: string;
	let otherUserId: number;

	// Tworzymy użytkowników raz przed wszystkimi testami
	beforeAll(async () => {
		await prisma.user.deleteMany({
			where: {
				email: {
					in: [TEST_USER.email, OTHER_TEST_USER.email],
				},
			},
		});

		// Tworzenie głównego użytkownika testowego
		const response = await request(app)
			.post("/api/v1/auth/register")
			.send(TEST_USER);

		token = response.body.user.token;
		const payload = jwt.verify(
			token,
			process.env.JWT_SECRET as string,
		) as UserPayload;
		userId = payload.userId;

		// Tworzenie drugiego użytkownika do testów autoryzacji
		const otherResponse = await request(app)
			.post("/api/v1/auth/register")
			.send(OTHER_TEST_USER);
		otherUserToken = otherResponse.body.user.token;
		const otherPayload = jwt.verify(
			otherUserToken,
			process.env.JWT_SECRET as string,
		) as UserPayload;
		otherUserId = otherPayload.userId;
	});

	// Czyścimy tylko joby po każdym teście
	afterEach(async () => {
		await prisma.jobs.deleteMany({
			where: {
				createdBy: {
					in: [userId, otherUserId],
				},
			},
		});
	});

	// Czyścimy wszystko po wszystkich testach
	afterAll(async () => {
		await prisma.jobs.deleteMany({
			where: {
				createdBy: {
					in: [userId, otherUserId],
				},
			},
		});
		await prisma.user.deleteMany({
			where: {
				email: {
					in: [TEST_USER.email, OTHER_TEST_USER.email],
				},
			},
		});
		await prisma.$disconnect();
	});

	describe("Tworzenie oferty pracy (POST /api/v1/jobs)", () => {
		describe("gdy dane są poprawne", () => {
			it("tworzy ofertę pracy z domyślnym statusem", async () => {
				const response = await request(app)
					.post("/api/v1/jobs")
					.set("Authorization", `Bearer ${token}`)
					.send(TEST_JOBS.valid.basic);

				expect(response.status).toBe(StatusCodes.CREATED);
				expect(response.body.job).toMatchObject({
					company: TEST_JOBS.valid.basic.company,
					position: TEST_JOBS.valid.basic.position,
					status: "PENDING",
				});
			});

			it("tworzy ofertę pracy z niestandardowym statusem", async () => {
				const response = await request(app)
					.post("/api/v1/jobs")
					.set("Authorization", `Bearer ${token}`)
					.send(TEST_JOBS.valid.withStatus);

				expect(response.status).toBe(StatusCodes.CREATED);
				expect(response.body.job.status).toBe("INTERVIEW");
			});
		});

		describe("gdy dane są niepoprawne", () => {
			it("zwraca błąd dla pustej nazwy firmy", async () => {
				const response = await request(app)
					.post("/api/v1/jobs")
					.set("Authorization", `Bearer ${token}`)
					.send(TEST_JOBS.invalid.emptyCompany);

				expect(response.status).toBe(StatusCodes.BAD_REQUEST);
			});

			it("zwraca błąd dla nieprawidłowego statusu", async () => {
				const response = await request(app)
					.post("/api/v1/jobs")
					.set("Authorization", `Bearer ${token}`)
					.send(TEST_JOBS.invalid.invalidStatus);

				expect(response.status).toBe(StatusCodes.BAD_REQUEST);
			});
			it("zwraca błąd gdy użytkownik testowy próbuje utworzyć ofertę", async () => {
				const response = await request(app)
					.post("/api/v1/jobs")
					.set("Authorization", `Bearer ${DEFAULT_TEST_USER_TOKEN}`)
					.send(TEST_JOBS.valid.basic);

				expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
				expect(response.body.msg).toBeDefined();
			});
		});
	});

	describe("Pobieranie ofert pracy (GET /api/v1/jobs)", () => {
		it("zwraca pustą listę gdy nie ma żadnych ofert", async () => {
			const response = await request(app)
				.get("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.OK);
			expect(response.body.jobs).toBeInstanceOf(Array);
			expect(response.body.jobs).toHaveLength(0);
		});

		it("zwraca tylko oferty zalogowanego użytkownika", async () => {
			// Tworzenie testowej oferty
			await prisma.jobs.create({
				data: {
					...TEST_JOBS.valid.basic,
					createdBy: userId,
				},
			});

			const response = await request(app)
				.get("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.OK);
			expect(response.body.jobs).toHaveLength(1);
			expect(response.body.jobs[0]).toMatchObject(TEST_JOBS.valid.basic);
		});
	});

	describe("Pobieranie pojedynczej oferty (GET /api/v1/jobs/:id)", () => {
		let jobId: number;

		beforeEach(async () => {
			// Tworzenie testowej oferty przed każdym testem
			const job = await prisma.jobs.create({
				data: {
					...TEST_JOBS.valid.basic,
					createdBy: userId,
				},
			});
			jobId = job.id;
		});

		it("zwraca szczegóły oferty gdy istnieje", async () => {
			const response = await request(app)
				.get(`/api/v1/jobs/${jobId}`)
				.set("Authorization", `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.OK);
			expect(response.body.job).toMatchObject(TEST_JOBS.valid.basic);
		});

		it("zwraca 404 gdy oferta nie istnieje", async () => {
			const invalidId = 99999;
			const response = await request(app)
				.get(`/api/v1/jobs/${invalidId}`)
				.set("Authorization", `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.NOT_FOUND);
		});

		it("zwraca 404 gdy oferta należy do innego użytkownika", async () => {
			const response = await request(app)
				.get(`/api/v1/jobs/${jobId}`)
				.set("Authorization", `Bearer ${otherUserToken}`);

			expect(response.status).toBe(StatusCodes.NOT_FOUND);
		});
	});

	describe("Aktualizacja oferty pracy (PATCH /api/v1/jobs/:id)", () => {
		let jobId: number;

		beforeEach(async () => {
			const job = await prisma.jobs.create({
				data: {
					...TEST_JOBS.valid.basic,
					createdBy: userId,
				},
			});
			jobId = job.id;
		});

		it("aktualizuje ofertę pracy gdy dane są poprawne", async () => {
			const response = await request(app)
				.patch(`/api/v1/jobs/${jobId}`)
				.set("Authorization", `Bearer ${token}`)
				.send(TEST_JOBS.valid.updated);

			expect(response.status).toBe(StatusCodes.OK);
			expect(response.body.job).toMatchObject(TEST_JOBS.valid.updated);
		});

		it("zwraca błąd autoryzacji gdy użytkownik próbuje zaktualizować nie swoją ofertę", async () => {
			console.log(otherUserToken);
			const response = await request(app)
				.patch(`/api/v1/jobs/${jobId}`)
				.set("Authorization", `Bearer ${otherUserToken}`)
				.send(TEST_JOBS.valid.updated);
			console.log(response.body);
			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			expect(response.body.msg).toBe("Not authorized to access this job");
		});

		it("zwraca błąd dla nieprawidłowego statusu", async () => {
			const response = await request(app)
				.patch(`/api/v1/jobs/${jobId}`)
				.set("Authorization", `Bearer ${token}`)
				.send({ status: "INVALID_STATUS" });

			expect(response.status).toBe(StatusCodes.BAD_REQUEST);
			expect(response.body.msg).toBe("Invalid status value");
		});

		it("zwraca błąd gdy użytkownik testowy próbuje zaktualizować ofertę", async () => {
			const response = await request(app)
				.patch(`/api/v1/jobs/${jobId}`)
				.set("Authorization", `Bearer ${DEFAULT_TEST_USER_TOKEN}`)
				.send(TEST_JOBS.valid.updated);

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			expect(response.body.msg).toBeDefined();
		});
	});

	describe("Usuwanie oferty pracy (DELETE /api/v1/jobs/:id)", () => {
		let jobId: number;

		beforeEach(async () => {
			const job = await prisma.jobs.create({
				data: {
					...TEST_JOBS.valid.basic,
					createdBy: userId,
				},
			});
			jobId = job.id;
		});

		it("usuwa ofertę pracy", async () => {
			const response = await request(app)
				.delete(`/api/v1/jobs/${jobId}`)
				.set("Authorization", `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.OK);

			// Sprawdzenie czy oferta została usunięta
			const job = await prisma.jobs.findUnique({
				where: { id: jobId },
			});
			expect(job).toBeNull();
		});

		it("zwraca błąd autoryzacji gdy użytkownik próbuje usunąć nie swoją ofertę", async () => {
			const response = await request(app)
				.delete(`/api/v1/jobs/${jobId}`)
				.set("Authorization", `Bearer ${otherUserToken}`);

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			expect(response.body.msg).toBe("Not authorized to access this job");
		});

		it("zwraca 404 gdy oferta nie istnieje", async () => {
			const invalidId = 99999;
			const response = await request(app)
				.delete(`/api/v1/jobs/${invalidId}`)
				.set("Authorization", `Bearer ${token}`);

			expect(response.status).toBe(StatusCodes.NOT_FOUND);
			expect(response.body.msg).toBeDefined();
		});
		it("zwraca błąd gdy użytkownik testowy próbuje usunąć ofertę", async () => {
			const response = await request(app)
				.delete(`/api/v1/jobs/${jobId}`)
				.set("Authorization", `Bearer ${DEFAULT_TEST_USER_TOKEN}`);

			expect(response.status).toBe(StatusCodes.UNAUTHORIZED);
			expect(response.body.msg).toBeDefined();
		});
	});
});
