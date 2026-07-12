import {
  Response,
  NextFunction,
} from "express";

import { AuthRequest } from "../middleware/auth";
import * as tripService from "../services/trip.service";

export const getTrips = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const trips = await tripService.getTrips();

    return res.json({
      success: true,
      data: trips,
    });
  } catch (error) {
    next(error);
  }
};

export const getTripById = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await tripService.getTripById(
      Number(req.params.id)
    );

    return res.json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

export const createTrip = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await tripService.createTrip(
      req.body,
      Number(req.user!.userId)
    );

    return res.status(201).json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

export const dispatchTrip = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await tripService.dispatchTrip(
      Number(req.params.id),
      Number(req.user!.userId)
    );

    return res.json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

export const completeTrip = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const trip = await tripService.completeTrip(
      Number(req.params.id),
      req.body,
      Number(req.user!.userId)
    );

    return res.json({
      success: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};