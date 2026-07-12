import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as maintenanceService from "../services/maintenance.service";

export const getMaintenanceLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const logs =
      await maintenanceService.getMaintenanceLogs();

    return res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

export const createMaintenance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const maintenance =
      await maintenanceService.createMaintenance(
        req.body
      );

    return res.status(201).json({
      success: true,
      data: maintenance,
    });
  } catch (error) {
    next(error);
  }
};

export const completeMaintenance = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const maintenance =
      await maintenanceService.completeMaintenance(
        Number(req.params.id)
      );

    return res.json({
      success: true,
      data: maintenance,
    });
  } catch (error) {
    next(error);
  }
};