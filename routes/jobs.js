import { Router } from "express";
import {
	getAllJobs,
	getSingleJob,
	createJob,
	updateJob,
	deleteJob,
} from "../controllers/jobs.js";

const router = Router();

router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getSingleJob).patch(updateJob).delete(deleteJob);

export default router;
