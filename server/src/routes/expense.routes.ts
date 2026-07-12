import express from "express";

import authenticate from "../middleware/auth";
import authorize from "../middleware/roleMiddleware";

import {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
} from "../controllers/expense.controller";
import { validateExpense } from "../validators/expense.validator";

const router = express.Router();

router.use(authenticate);

router.get("/", getExpenses);

router.get("/:id", getExpenseById);

router.post(
  "/",
  authorize("FLEET_MANAGER", "FINANCIAL_ANALYST"),
  validateExpense,
  createExpense
);

router.put(
  "/:id",
  authorize("FLEET_MANAGER", "FINANCIAL_ANALYST"),
  validateExpense,
  updateExpense
);

router.delete(
  "/:id",
  authorize("FLEET_MANAGER", "FINANCIAL_ANALYST"),
  deleteExpense
);

export default router;
