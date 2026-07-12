import prisma from "../config/prisma";

export const findAll = async () => {
  return prisma.expense.findMany({
    orderBy: {
      expenseDate: "desc",
    },
    include: {
      vehicle: true,
      trip: true,
    },
  });
};

export const findById = async (id: number) => {
  return prisma.expense.findUnique({
    where: { id },
    include: {
      vehicle: true,
      trip: true,
    },
  });
};

export const create = async (data: any) => {
  return prisma.expense.create({
    data,
    include: {
      vehicle: true,
      trip: true,
    },
  });
};

export const update = async (id: number, data: any) => {
  return prisma.expense.update({
    where: { id },
    data,
    include: {
      vehicle: true,
      trip: true,
    },
  });
};

export const remove = async (id: number) => {
  return prisma.expense.delete({
    where: { id },
  });
};
