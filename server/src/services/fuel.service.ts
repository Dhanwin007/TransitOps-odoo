import prisma from "../config/prisma";
import * as fuelRepository from "../repositories/fuel.repository";

export const getFuelLogs = async () => {
  return fuelRepository.findAll();
};

export const getFuelLogById = async (id: number) => {
  const log = await fuelRepository.findById(id);

  if (!log) {
    throw new Error("Fuel log not found");
  }

  return log;
};

export const createFuelLog = async (data: any) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: Number(data.vehicleId),
    },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  return fuelRepository.create({
    vehicleId: Number(data.vehicleId),
    tripId: data.tripId ? Number(data.tripId) : null,
    litres: Number(data.litres),
    cost: Number(data.cost),
    fuelStation: data.fuelStation,
    odometer: Number(data.odometer),
    logDate: new Date(data.logDate),
  });
};

export const updateFuelLog = async (
  id: number,
  data: any
) => {
  await getFuelLogById(id);

  return fuelRepository.update(id, {
    ...data,
  });
};

export const deleteFuelLog = async (
  id: number
) => {
  await getFuelLogById(id);

  return fuelRepository.remove(id);
};