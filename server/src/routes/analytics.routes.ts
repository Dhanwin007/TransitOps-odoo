import express from "express";

import authenticate from "../middleware/auth";
import authorize from "../middleware/roleMiddleware";

import { getAnalytics } from "../controllers/analytics.controller";

const router = express.Router();

router.use(authenticate);

router.get(
  "/",
  authorize(
    "FLEET_MANAGER",
    "FINANCIAL_ANALYST"
  ),
  getAnalytics
);

export default router;