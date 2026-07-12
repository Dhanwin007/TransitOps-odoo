import express from "express";

import authenticate from "../middleware/auth";
import authorize from "../middleware/roleMiddleware";

import {
  getTrips,
  getTripById,
  createTrip,
  dispatchTrip,
  completeTrip,
} from "../controllers/trip.controller";

const router = express.Router();

router.use(authenticate);

router.get("/", getTrips);
router.get("/:id", getTripById);

router.post(
  "/",
  authorize("DISPATCHER", "FLEET_MANAGER"),
  createTrip
);

router.patch(
  "/:id/dispatch",
  authorize("DISPATCHER"),
  dispatchTrip
);

router.patch(
  "/:id/complete",
  authorize("DISPATCHER"),
  completeTrip
);

export default router;