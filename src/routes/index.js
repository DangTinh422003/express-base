import express from "express";
import accessRouter from "./access/index.js";
import { apiKey } from "../auth/checkAuth.js";
const router = express.Router();

// check api key
router.use(apiKey);

// check permission
router.use("/v1/api", accessRouter);

export default router;
