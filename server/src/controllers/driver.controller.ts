import { Request, Response, NextFunction } from "express";

import * as driverService from "../services/driver.service";

const createDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const driver = await driverService.createDriver(req.body);

    return res.status(201).json({
      success: true,
      message: "Driver created successfully",
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

const getAllDrivers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const drivers = await driverService.getAllDrivers();

    return res.status(200).json({
      success: true,
      data: drivers,
    });
  } catch (error) {
    next(error);
  }
};

const getDriverById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const driver = await driverService.getDriverById(id);

    return res.status(200).json({
      success: true,
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

const updateDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    const driver = await driverService.updateDriver(
      id,
      req.body
    );

    return res.status(200).json({
      success: true,
      message: "Driver updated successfully",
      data: driver,
    });
  } catch (error) {
    next(error);
  }
};

const deleteDriver = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);

    await driverService.deleteDriver(id);

    return res.status(200).json({
      success: true,
      message: "Driver deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};