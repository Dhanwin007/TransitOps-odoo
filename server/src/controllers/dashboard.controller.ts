import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as dashboardService from "../services/dashboard.service";

export const getDashboard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const dashboard =
      await dashboardService.getDashboard();

    return res.status(200).json({
      success: true,
      data: dashboard,
    });
  } catch (error) {
    next(error);
  }
};