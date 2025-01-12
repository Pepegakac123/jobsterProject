import { Router } from "express";
import getAllStats from "../controllers/stats.js";

const router = Router();

router.route("/").get(getAllStats);

export default router;
