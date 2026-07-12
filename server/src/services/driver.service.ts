import { Prisma } from "../generated/prisma/client";

import * as driverRepository from "../repositories/driver.repository";

const createDriver = async (data: Prisma.DriverCreateInput) => {
  // Check if license already exists
  const existingDriver =
    await driverRepository.getDriverByLicense(data.licenseNo);

  if (existingDriver) {
    throw new Error("Driver with this license already exists");
  }

  // Check license expiry
  const today = new Date();

  if (new Date(data.licenseExpiry) < today) {
    throw new Error("Driver license has already expired");
  }

  // Create driver with defaults
  return driverRepository.createDriver({
  ...data,
  licenseExpiry: new Date(data.licenseExpiry),
  safetyScore: new Prisma.Decimal(100),
  status: "AVAILABLE",
});
};

const getAllDrivers = async () => {
  return driverRepository.getAllDrivers();
};

const getDriverById = async (id: number) => {
  const driver = await driverRepository.getDriverById(id);

  if (!driver) {
    throw new Error("Driver not found");
  }

  return driver;
};

const updateDriver = async (
  id: number,
  data: Prisma.DriverUpdateInput
) => {
  await getDriverById(id);

  return driverRepository.updateDriver(id, data);
};

const deleteDriver = async (id: number) => {
  await getDriverById(id);

  return driverRepository.deleteDriver(id);
};

export {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
};