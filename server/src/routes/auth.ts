import { Router } from "express";
import { registerUser, loginUser, updateUser } from "../controllers/auth.js";
import authenticateUser from "../middleware/authentication.js";
import testUser from "../middleware/testUser.js";
import rateLimiter from "express-rate-limit";

const apiLimiter = rateLimiter({
	windowMs: 15 * 60 * 1000,
	max: 20,
	message: {
		status: 429,
		message:
			"Too many requests from this IP, please try again after 15 minutes",
	},
});

const router = Router();

router.route("/register").post(apiLimiter, registerUser);
router.route("/login").post(apiLimiter, loginUser);
router.route("/update").patch(authenticateUser, testUser, updateUser);

export default router;
