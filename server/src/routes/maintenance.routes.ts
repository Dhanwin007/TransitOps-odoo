import express from "express";

import authenticate from "../middleware/auth";
import authorize from "../middleware/roleMiddleware";

import {
  getMaintenanceLogs,
  createMaintenance,
  completeMaintenance,
} from "../controllers/maintenance.controller";

const router = express.Router();

router.use(authenticate);

router.get("/", getMaintenanceLogs);

router.post(
  "/",
  authorize("FLEET_MANAGER"),
  createMaintenance
);

router.patch(
  "/:id/complete",
  authorize("FLEET_MANAGER"),
  completeMaintenance
);

export default router;