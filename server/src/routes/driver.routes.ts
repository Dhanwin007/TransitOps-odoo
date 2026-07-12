import express from "express";

import authenticate from "../middleware/auth";

import {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
} from "../controllers/driver.controller";

const router = express.Router();

router.post("/", authenticate, createDriver);

router.get("/", authenticate, getAllDrivers);

router.get("/:id", authenticate, getDriverById);

router.patch("/:id", authenticate, updateDriver);

router.delete("/:id", authenticate, deleteDriver);

export default router;