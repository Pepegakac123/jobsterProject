import path from "node:path";
import "express-async-errors";
import express from "express";
import type { Express, Request, Response, NextFunction } from "express";
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/authentication.js";
import authRouter from "./routes/auth.js";
import jobsRouter from "./routes/jobs.js";
import statsRouter from "./routes/stats.js";

// extra security
import helmet from "helmet";
import xss from "xss-clean";
import cors from "cors";

export const app: Express = express();
app.set("trust proxy", 1);

// app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(express.json());
app.use(helmet());
app.use(xss());

app.use(
	cors({
		origin: "http://localhost:5173", // adres twojego frontendu
		credentials: true,
	}),
);
// // serve index.html
// app.get('*', (req, res) => {
// 	res.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
//   });

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/stats", authenticateUser, statsRouter);
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

const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
	try {
		app.listen(PORT, () =>
			console.log(`Server is listening on port ${PORT}...`),
		);
	} catch (error) {
		console.log(error);
	}
};

start();
