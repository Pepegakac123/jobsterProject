import mockData from "./MOCK_DATA.json" assert { type: "json" };
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const populate = async () => {
	try {
		await prisma.jobs.createMany({
			data: mockData,
		});
		console.log("sucessfully populated");
		process.exit(0);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};
populate();
