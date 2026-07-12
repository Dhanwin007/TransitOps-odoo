import prisma from "../config/prisma";

export const findAll = async () => {
  return prisma.maintenanceLog.findMany({
    include: {
      vehicle: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findById = async (id: number) => {
  return prisma.maintenanceLog.findUnique({
    where: { id },
    include: {
      vehicle: true,
    },
  });
};

export const create = async (data: any) => {
  return prisma.maintenanceLog.create({
    data,
  });
};

export const update = async (
  id: number,
  data: any
) => {
  return prisma.maintenanceLog.update({
    where: { id },
    data,
  });
};