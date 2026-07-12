import { Request, Response, NextFunction } from "express";

export const validateExpense = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    vehicleId,
    expenseType,
    amount,
    expenseDate,
  } = req.body;

  if (!vehicleId || !expenseType || amount === undefined || !expenseDate) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields: vehicleId, expenseType, amount, expenseDate",
    });
  }

  if (isNaN(Number(vehicleId))) {
    return res.status(400).json({
      success: false,
      message: "vehicleId must be a valid number",
    });
  }

  if (isNaN(Number(amount))) {
    return res.status(400).json({
      success: false,
      message: "amount must be a valid number",
    });
  }

  const date = new Date(expenseDate);
  if (isNaN(date.getTime())) {
    return res.status(400).json({
      success: false,
      message: "expenseDate must be a valid date string",
    });
  }

  next();
};
