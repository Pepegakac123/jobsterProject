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

// Stałe testowe
const TEST_USER = {
	name: "vitest",
	lastName: "user",
	location: "Wrocław",
	email: "vitest@mail.com",
	password: "kTx12KL#!",
};

const TEST_DATA = {
	valid: {
		changedName: {
			...TEST_USER,
			name: "Vixa",
		},
		changedEmail: {
			...TEST_USER,
			email: "vitestChanged@mail.com",
		},
	},
	invalid: {
		emptyName: {
			...TEST_USER,
			name: "",
		},
		emptyEmail: {
			...TEST_USER,
			email: "",
		},
		alreadyExistingEmail: {
			...TEST_USER,
			email: "test2@mail.com",
		},
	},
};

const createExpectedResponse = (userData: typeof TEST_USER) => ({
	email: userData.email,
	lastName: userData.lastName,
	location: userData.location,
	name: userData.name,
});

const expectValidUserResponse = (
	response: request.Response,
	expectedData: typeof TEST_USER,
) => {
	expect(response.status).toBe(StatusCodes.OK);
	expect(response.body.user).toMatchObject(
		createExpectedResponse(expectedData),
	);
	expect(response.body.user.token).toBeDefined();
};

const expectInvalidResponse = (response: request.Response) => {
	expect(response.status).toBe(StatusCodes.BAD_REQUEST);
	expect(response.body.msg).toBeDefined();
};

describe("Update User API", () => {
	let token: string;
	let userId: number;

	// beforeAll(async () => {
	// 	// Czyszczenie bazy danych
	// 	await prisma.jobs.deleteMany();
	// 	await prisma.user.deleteMany();
	// });

	beforeEach(async () => {
		// Tworzenie użytkownika testowego
		const response = await request(app)
			.post("/api/v1/auth/register")
			.send(TEST_USER);
		token = response.body.user.token;
		userId = response.body.user.id;
	});

	afterEach(async () => {
		// Próbujemy usunąć użytkownika po obu możliwych emailach
		await prisma.user.deleteMany({
			where: {
				email: {
					in: [TEST_USER.email, TEST_DATA.valid.changedEmail.email],
				},
			},
		});
	});

	afterAll(async () => {
		await prisma.$disconnect();
	});

	describe("Valid Data", () => {
		it("Should Update User Name", async () => {
			const response = await request(app)
				.patch("/api/v1/auth/update")
				.set("Authorization", `Bearer ${token}`)
				.send(TEST_DATA.valid.changedName);
			console.log(response.body.user);
			expectValidUserResponse(response, TEST_DATA.valid.changedName);
		});

		it("Should Update User Email", async () => {
			const response = await request(app)
				.patch("/api/v1/auth/update")
				.set("Authorization", `Bearer ${token}`)
				.send(TEST_DATA.valid.changedEmail);
			console.log(response.body);
			expectValidUserResponse(response, TEST_DATA.valid.changedEmail);
		});
	});
	describe("Invalid Data", () => {
		it("Should Not Update User Name", async () => {
			const response = await request(app)
				.patch("/api/v1/auth/update")
				.set("Authorization", `Bearer ${token}`)
				.send(TEST_DATA.invalid.emptyName);

			expectInvalidResponse(response);
			console.log(response.body.msg);
		});

		it("Should Not Update User Email", async () => {
			const response = await request(app)
				.patch("/api/v1/auth/update")
				.set("Authorization", `Bearer ${token}`)
				.send(TEST_DATA.invalid.emptyEmail);

			expectInvalidResponse(response);
			console.log(response.body.msg);
		});

		it("Should Not Update User Email", async () => {
			const secondUser = await request(app)
				.post("/api/v1/auth/register")
				.send({
					...TEST_USER,
					email: TEST_DATA.invalid.alreadyExistingEmail.email,
				});
			const response = await request(app)
				.patch("/api/v1/auth/update")
				.set("Authorization", `Bearer ${token}`)
				.send(TEST_DATA.invalid.alreadyExistingEmail);

			expectInvalidResponse(response);
			expect(response.body.msg).toMatch("Email already exists");

			await prisma.user.delete({
				where: {
					email: TEST_DATA.invalid.alreadyExistingEmail.email,
				},
			});
		});
		it("Should throw Bad Request Error if it is the test user", async () => {
			const response = await request(app)
				.patch("/api/v1/auth/update")
				.set(
					"Authorization",
					"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIxMSwibmFtZSI6IlRlc3QiLCJpYXQiOjE3MzY2OTQzMDIsImV4cCI6MTczOTI4NjMwMn0.wZnd16cLxmSTxW7i2g62KaX8LAobAOO5dgd8KcD9Vc8",
				)
				.send(TEST_DATA.valid.changedName);

			expect(response.status).toBe(StatusCodes.BAD_REQUEST);
			expect(response.body.msg).toBeDefined();
		});
	});
});
