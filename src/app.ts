import "express-async-errors";
import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/authentication.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";

// extra security
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors";
import xss from "xss-clean";

export const app: Express = express();
app.set("trust proxy", 1);
app.use(
	rateLimiter({
		windowMs: 15 * 60 * 1000, // 15 minutes
		max: 100, //limit each IP to 100 request per windowsMs
	}),
);
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(xss());

app.get("/", (req: Request, res: Response) => {
	res.send("jobs api");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(
	errorHandlerMiddleware as (
		err: Error,
		req: Request,
		res: Response,
		next: NextFunction,
	) => void,
);

const port = process.env.PORT || 3000;

const start = async (): Promise<void> => {
	try {
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`),
		);
	} catch (error) {
		console.log(error);
	}
};

start();
