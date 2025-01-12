import { Router } from "express";
import {
	getAllJobs,
	getSingleJob,
	createJob,
	updateJob,
	deleteJob,
} from "../controllers/jobs.js";
import testUser from "../middleware/testUser.js";

const router = Router();

router.route("/").get(getAllJobs).post(testUser, createJob);
router
	.route("/:id")
	.get(getSingleJob)
	.patch(testUser, updateJob)
	.delete(testUser, deleteJob);

export default router;
