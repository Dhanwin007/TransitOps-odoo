import prisma from "../config/prisma";

export const findAll = async () => {
  return prisma.vehicle.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findById = async (id: number) => {
  return prisma.vehicle.findUnique({
    where: { id },
  });
};

export const findByRegistration = async (
  registrationNo: string
) => {
  return prisma.vehicle.findUnique({
    where: {
      registrationNo,
    },
  });
};

export const create = async (data: any) => {
  return prisma.vehicle.create({
    data,
  });
};

export const update = async (
  id: number,
  data: any
) => {
  return prisma.vehicle.update({
    where: { id },
    data,
  });
};

export const remove = async (id: number) => {
  return prisma.vehicle.delete({
    where: { id },
  });
};