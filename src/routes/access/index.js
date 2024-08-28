import express from "express";
import { accessController } from "../../controllers/access.controller.js";
import { asyncHandler } from "../../auth/checkAuth.js";
const router = express.Router();

router.post("/shop/sign-up", asyncHandler(accessController.signUp));

export default router;
