import prisma from "../config/prisma";
import { Prisma } from "../generated/prisma/client";

const createDriver = async (data: Prisma.DriverCreateInput) => {
  return prisma.driver.create({
    data,
  });
};

const getAllDrivers = async () => {
  return prisma.driver.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getDriverById = async (id: number) => {
  return prisma.driver.findUnique({
    where: {
      id,
    },
  });
};

const getDriverByLicense = async (licenseNo: string) => {
  return prisma.driver.findUnique({
    where: {
      licenseNo,
    },
  });
};

const updateDriver = async (
  id: number,
  data: Prisma.DriverUpdateInput
) => {
  return prisma.driver.update({
    where: {
      id,
    },
    data,
  });
};

const deleteDriver = async (id: number) => {
  return prisma.driver.delete({
    where: {
      id,
    },
  });
};

export {
  createDriver,
  getAllDrivers,
  getDriverById,
  getDriverByLicense,
  updateDriver,
  deleteDriver,
};