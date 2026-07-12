import express from "express";

import authenticate from "../middleware/auth";
import authorize from "../middleware/roleMiddleware";

import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../controllers/driver.controller";

const router = express.Router();

router.post("/", authenticate,authorize("FLEET_MANAGER","DISPATCHER"), createDriver);

router.get("/", authenticate,authorize("FLEET_MANAGER","DISPATCHER","FINANCIAL_ANALYST"), getAllDrivers);

router.get("/:id", authenticate,authorize("FLEET_MANAGER","DISPATCHER","FINANCIAL_ANALYST"), getDriverById);

router.patch("/:id", authenticate,authorize("FLEET_MANAGER","DISPATCHER"), updateDriver);

router.delete("/:id", authenticate,authorize("FLEET_MANAGER"), deleteDriver);

export default router;