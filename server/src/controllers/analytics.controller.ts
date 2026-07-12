import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as analyticsService from "../services/analytics.service";

export const getAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const analytics =
      await analyticsService.getAnalytics();

    return res.status(200).json({
      success: true,
      data: analytics,
    });
  } catch (error) {
    next(error);
  }
};