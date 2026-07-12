import express from "express";

import authenticate from "../middleware/auth";

import {
  getDashboard,
} from "../controllers/dashboard.controller";

const router = express.Router();

router.use(authenticate);

router.get("/", getDashboard);

export default router;