import express from "express";

import authenticate from "../middleware/auth";
import authorize from "../middleware/roleMiddleware";

import {
  getVehicles,
  getVehicleById,
  createVehicle,
  updateVehicle,
  deleteVehicle,
} from "../controllers/vehicle.controller";

const router = express.Router();

router.use(authenticate);

router.get("/", getVehicles);

router.get("/:id", getVehicleById);

router.post(
  "/",
  authorize("FLEET_MANAGER","DISPATCHER"),
  createVehicle
);

router.patch(
  "/:id",
  authorize("FLEET_MANAGER"),
  updateVehicle
);

router.delete(
  "/:id",
  authorize("FLEET_MANAGER"),
  deleteVehicle
);

export default router;