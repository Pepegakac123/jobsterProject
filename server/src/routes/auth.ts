import { Router } from "express";
import { registerUser, loginUser, updateUser } from "../controllers/auth.js";
import authenticateUser from "../middleware/authentication.js";
const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/update").patch(authenticateUser, updateUser);

export default router;
