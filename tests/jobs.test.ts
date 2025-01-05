import { describe, it, expect, beforeEach, afterAll, beforeAll } from "vitest";
import request from "supertest";
import { app } from "../src/app.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Stałe testowe
const TEST_USER = {
	name: "vitest",
	email: "vitest@mail.com",
	password: "kTx12KL#!",
};

const TEST_JOBS = {
	valid: {
		basic: {
			company: "Vitest Company",
			position: "Tester",
		},
		withCustomStatus: {
			company: "Vitest Company",
			position: "Tester",
			status: "REJECTED",
		},
		updated: {
			company: "Vitest Company Updated",
			status: "INTERVIEW",
		},
	},
	invalid: {
		emptyCompany: {
			company: "",
			position: "Tester",
		},
		invalidStatus: {
			company: "Vitest Company",
			position: "Tester",
			status: "WAITING",
		},
	},
};

// Pomocnicze funkcje
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const createTestJob = async (token: string, jobData: any) => {
	return request(app)
		.post("/api/v1/jobs")
		.set("Authorization", `Bearer ${token}`)
		.send(jobData);
};

const getTestJob = async (token: string, jobId: number) => {
	return request(app)
		.get(`/api/v1/jobs/${jobId}`)
		.set("Authorization", `Bearer ${token}`);
};

/**
 * Testy dla endpointów Jobs API
 * Wymagania wstępne:
 * - Baza danych musi być czysta przed rozpoczęciem testów
 * - Użytkownik musi być zarejestrowany przed testami endpointów jobs
 */
describe("Jobs API", () => {
	let token: string;
	let userId: number;

	// Setup globalny
	beforeAll(async () => {
		// Czyszczenie bazy danych
		await prisma.jobs.deleteMany();
		await prisma.user.deleteMany();

		// Tworzenie użytkownika testowego
		const response = await request(app)
			.post("/api/v1/auth/register")
			.send(TEST_USER);

		token = response.body.token;
		userId = response.body.user.id;
	});

	// Setup przed każdym testem
	beforeEach(async () => {
		await prisma.jobs.deleteMany();
	});

	// Czyszczenie po wszystkich testach
	afterAll(async () => {
		await prisma.jobs.deleteMany();
		await prisma.user.deleteMany();
		await prisma.$disconnect();
	});

	describe("Tworzenie oferty pracy (POST /api/v1/jobs)", () => {
		describe("gdy dane są poprawne", () => {
			it("tworzy ofertę pracy z domyślnym statusem", async () => {
				const response = await createTestJob(token, TEST_JOBS.valid.basic);

				expect(response.status).toBe(201);
				expect(response.body.job).toMatchObject({
					company: TEST_JOBS.valid.basic.company,
					position: TEST_JOBS.valid.basic.position,
					status: "PENDING",
				});

				// Sprawdzenie zapisu w bazie danych
				const job = await prisma.jobs.findFirst({
					where: { company: TEST_JOBS.valid.basic.company },
				});
				expect(job).toMatchObject({
					company: TEST_JOBS.valid.basic.company,
					position: TEST_JOBS.valid.basic.position,
				});
			});

			it("tworzy ofertę pracy z niestandardowym statusem", async () => {
				const response = await createTestJob(
					token,
					TEST_JOBS.valid.withCustomStatus,
				);

				expect(response.status).toBe(201);
				expect(response.body.job).toMatchObject({
					status: TEST_JOBS.valid.withCustomStatus.status,
				});
			});
		});

		describe("gdy dane są niepoprawne", () => {
			it("zwraca błąd dla nieprawidłowego statusu", async () => {
				const response = await createTestJob(
					token,
					TEST_JOBS.invalid.invalidStatus,
				);

				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty(
					"msg",
					"Database error validation occurred",
				);
			});

			it("zwraca błąd dla pustych wymaganych pól", async () => {
				const response = await createTestJob(
					token,
					TEST_JOBS.invalid.emptyCompany,
				);

				expect(response.status).toBe(400);
				expect(response.body.msg).toMatch(/cannot be empty|provide all values/);
			});
		});

		describe("gdy występują problemy z autoryzacją", () => {
			it("zwraca 401 gdy token nie jest dostarczony", async () => {
				const response = await request(app)
					.post("/api/v1/jobs")
					.send(TEST_JOBS.valid.basic);

				expect(response.status).toBe(401);
				expect(response.body).toHaveProperty("msg", "Authentication Invalid");
			});

			it("zwraca 401 gdy token jest nieprawidłowy", async () => {
				const response = await createTestJob(
					"invalid_token",
					TEST_JOBS.valid.basic,
				);

				expect(response.status).toBe(401);
				expect(response.body).toHaveProperty("msg", "Authentication Invalid");
			});
		});
	});

	describe("Pobieranie ofert pracy (GET /api/v1/jobs)", () => {
		it("zwraca pustą listę gdy nie ma żadnych ofert", async () => {
			const response = await request(app)
				.get("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`);

			expect(response.status).toBe(200);
			expect(response.body.jobs).toBeInstanceOf(Array);
			expect(response.body.jobs).toHaveLength(0);
		});

		it("zwraca wszystkie oferty dla zalogowanego użytkownika", async () => {
			// Utworzenie testowej oferty
			await prisma.jobs.create({
				data: {
					...TEST_JOBS.valid.basic,
					createdBy: userId,
				},
			});

			const response = await request(app)
				.get("/api/v1/jobs")
				.set("Authorization", `Bearer ${token}`);

			expect(response.status).toBe(200);
			expect(response.body.jobs).toBeInstanceOf(Array);
			expect(response.body.jobs).toHaveLength(1);
			expect(response.body.jobs[0]).toMatchObject(TEST_JOBS.valid.basic);
		});
	});

	describe("Pobieranie pojedynczej oferty (GET /api/v1/jobs/:id)", () => {
		it("zwraca szczegóły oferty gdy istnieje", async () => {
			const job = await prisma.jobs.create({
				data: {
					...TEST_JOBS.valid.basic,
					createdBy: userId,
				},
			});

			const response = await getTestJob(token, job.id);

			expect(response.status).toBe(200);
			expect(response.body.job).toMatchObject(TEST_JOBS.valid.basic);
		});

		it("zwraca 404 gdy oferta nie istnieje", async () => {
			const response = await getTestJob(token, 0);

			expect(response.status).toBe(404);
			expect(response.body).toHaveProperty("msg", "Job not found");
		});

		it("zwraca 400 gdy id jest nieprawidłowe", async () => {
			const response = await request(app)
				.get("/api/v1/jobs/invalid_id")
				.set("Authorization", `Bearer ${token}`);

			expect(response.status).toBe(400);
			expect(response.body).toHaveProperty("msg", "Id must be an valid number");
		});
	});
	describe("Modyfikacja oferty pracy (PATCH /api/v1/jobs/:id)", () => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let testJob: any; // typ możesz dostosować do swojego modelu Job

		beforeEach(async () => {
			// Tworzymy job przed każdym testem
			testJob = await prisma.jobs.create({
				data: {
					...TEST_JOBS.valid.basic,
					createdBy: userId,
				},
			});
		});

		describe("gdy dane są poprawne", () => {
			it("modyfikuje wszystkie pola oferty", async () => {
				const response = await request(app)
					.patch(`/api/v1/jobs/${testJob.id}`)
					.set("Authorization", `Bearer ${token}`)
					.send(TEST_JOBS.valid.updated);

				expect(response.status).toBe(200);
				expect(response.body.job).toMatchObject(TEST_JOBS.valid.updated);

				// Sprawdzenie w bazie danych
				const updatedJob = await prisma.jobs.findUnique({
					where: { id: testJob.id },
				});
				expect(updatedJob).toMatchObject(TEST_JOBS.valid.updated);
			});

			it("modyfikuje pojedyncze pole oferty", async () => {
				const partialUpdate = { company: "Partially Updated Company" };

				const response = await request(app)
					.patch(`/api/v1/jobs/${testJob.id}`)
					.set("Authorization", `Bearer ${token}`)
					.send(partialUpdate);

				expect(response.status).toBe(200);
				expect(response.body.job.company).toBe(partialUpdate.company);
				expect(response.body.job.position).toBe(testJob.position); // pozostałe pola nie powinny się zmienić
			});
		});

		describe("gdy występują błędy", () => {
			it("zwraca 404 gdy job nie istnieje", async () => {
				const response = await request(app)
					.patch("/api/v1/jobs/99999")
					.set("Authorization", `Bearer ${token}`)
					.send(TEST_JOBS.valid.updated);

				expect(response.status).toBe(404);
				expect(response.body).toHaveProperty("msg", "Job not found");
			});

			it("zwraca 401 gdy użytkownik próbuje zmodyfikować nie swoją ofertę", async () => {
				// Tworzymy nowego użytkownika
				const otherUserResponse = await request(app)
					.post("/api/v1/auth/register")
					.send({
						...TEST_USER,
						email: "other@mail.com",
					});
				console.log(otherUserResponse.body.token);
				const response = await request(app)
					.patch(`/api/v1/jobs/${testJob.id}`)
					.set("Authorization", `Bearer ${otherUserResponse.body.token}`)
					.send(TEST_JOBS.valid.updated);

				expect(response.status).toBe(401);
				expect(response.body).toHaveProperty(
					"msg",
					"Not authorized to access this job",
				);
			});

			it("zwraca 400 gdy status jest nieprawidłowy", async () => {
				const response = await request(app)
					.patch(`/api/v1/jobs/${testJob.id}`)
					.set("Authorization", `Bearer ${token}`)
					.send({ status: "INVALID_STATUS" });

				expect(response.status).toBe(400);
				expect(response.body).toHaveProperty("msg", "Invalid status value");
			});
		});
	});
	describe("Usuwanie oferty pracy (DELETE /api/v1/jobs/:id)", () => {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		let testJob: any;

		beforeEach(async () => {
			// Tworzymy job przed każdym testem
			testJob = await prisma.jobs.create({
				data: {
					...TEST_JOBS.valid.basic,
					createdBy: userId,
				},
			});
		});
		describe("gdy dane są poprawne", () => {
			it("Usuwa Ofertę", async () => {
				const response = await request(app)
					.delete(`/api/v1/jobs/${testJob.id}`)
					.set("Authorization", `Bearer ${token}`);
				console.log(response.body);
				expect(response.status).toBe(200);
				const deletedJob = await prisma.jobs.findUnique({
					where: { id: testJob.id },
				});
				expect(deletedJob).toBeNull();
			});
		});
		describe("gdy występują błędy", () => {
			it("Zwraca 404 gdy job nie istnieje", async () => {
				const response = await request(app)
					.delete("/api/v1/jobs/99999")
					.set("Authorization", `Bearer ${token}`);

				expect(response.status).toBe(404);
			});
			it("zwraca 401 gdy użytkownik próbuje usunąć nie swoją ofertę", async () => {
				// Tworzymy nowego użytkownika
				const otherUserResponse = await request(app)
					.post("/api/v1/auth/register")
					.send({
						...TEST_USER,
						email: "other@mail.com",
					});

				const response = await request(app)
					.delete(`/api/v1/jobs/${testJob.id}`)
					.set("Authorization", `Bearer ${otherUserResponse.body.token}`);

				expect(response.status).toBe(401);
			});
		});
	});
});
