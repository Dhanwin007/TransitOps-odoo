import prisma from "../config/prisma";

export const findAll = async () => {
  return prisma.trip.findMany({
    include: {
      vehicle: true,
      driver: true,
      creator: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const findById = async (id: number) => {
  return prisma.trip.findUnique({
    where: { id },
    include: {
      vehicle: true,
      driver: true,
      creator: true,
    },
  });
};

export const create = async (data: any) => {
  return prisma.trip.create({
    data,
  });
};