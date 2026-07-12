import {
  Request,
  Response,
  NextFunction,
} from "express";

import * as fuelService from "../services/fuel.service";

export const getFuelLogs = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const logs = await fuelService.getFuelLogs();

    res.json({
      success: true,
      data: logs,
    });
  } catch (error) {
    next(error);
  }
};

export const getFuelLogById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const log =
      await fuelService.getFuelLogById(
        Number(req.params.id)
      );

    res.json({
      success: true,
      data: log,
    });
  } catch (error) {
    next(error);
  }
};

export const createFuelLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const log =
      await fuelService.createFuelLog(
        req.body
      );

    res.status(201).json({
      success: true,
      data: log,
    });
  } catch (error) {
    next(error);
  }
};

export const updateFuelLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const log =
      await fuelService.updateFuelLog(
        Number(req.params.id),
        req.body
      );

    res.json({
      success: true,
      data: log,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteFuelLog = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await fuelService.deleteFuelLog(
      Number(req.params.id)
    );

    res.json({
      success: true,
      message: "Fuel log deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};