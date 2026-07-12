import express from "express";

import authenticate from "../middleware/auth";

import {
  getFuelLogs,
  getFuelLogById,
  createFuelLog,
  updateFuelLog,
  deleteFuelLog,
} from "../controllers/fuel.controller";

const router = express.Router();

router.use(authenticate);

router.get("/", getFuelLogs);

router.get("/:id", getFuelLogById);

router.post("/", createFuelLog);

router.patch("/:id", updateFuelLog);

router.delete("/:id", deleteFuelLog);

export default router;