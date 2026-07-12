import prisma from "../config/prisma";

export const getSettings = async () => {
  return prisma.setting.findFirst();
};

export const createDefaultSettings = async () => {
  return prisma.setting.create({
    data: {
      depotName: "TransitOps Depot",
      currency: "INR",
      distanceUnit: "Kilometers",
    },
  });
};

export const updateSettings = async (
  id: number,
  data: {
    depotName: string;
    currency: string;
    distanceUnit: string;
  }
) => {
  return prisma.setting.update({
    where: {
      id,
    },
    data,
  });
};