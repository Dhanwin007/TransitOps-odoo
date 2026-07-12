import prisma from "../config/prisma";

export const findAll = async () => {
  return prisma.fuelLog.findMany({
    include: {
      vehicle: true,
      trip: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findById = async (id: number) => {
  return prisma.fuelLog.findUnique({
    where: { id },
    include: {
      vehicle: true,
      trip: true,
    },
  });
};

export const create = async (data: any) => {
  return prisma.fuelLog.create({
    data,
  });
};

export const update = async (
  id: number,
  data: any
) => {
  return prisma.fuelLog.update({
    where: { id },
    data,
  });
};

export const remove = async (id: number) => {
  return prisma.fuelLog.delete({
    where: { id },
  });
};