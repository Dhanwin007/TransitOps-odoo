import express from "express";

import authenticate from "../middleware/auth";
import authorize from "../middleware/roleMiddleware";

import {
  getSettings,
  updateSettings,
} from "../controllers/settings.controller";

const router = express.Router();

router.use(authenticate);

router.get("/", getSettings);

router.put(
  "/",authorize("FLEET_MANAGER"),
  updateSettings
);

export default router;