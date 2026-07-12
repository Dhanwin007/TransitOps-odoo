import prisma from "../config/prisma";
import * as maintenanceRepository from "../repositories/maintenance.repository";

export const getMaintenanceLogs = async () => {
  return maintenanceRepository.findAll();
};

export const createMaintenance = async (data: any) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: {
      id: Number(data.vehicleId),
    },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  if (vehicle.status === "ON_TRIP") {
    throw new Error(
      "Vehicle on active trip cannot enter maintenance"
    );
  }

  return prisma.$transaction(async (tx) => {
    const maintenance =
      await tx.maintenanceLog.create({
        data: {
          vehicleId: Number(data.vehicleId),
          serviceType: data.serviceType,
          description: data.description,
          cost: Number(data.cost),
          startDate: new Date(data.startDate),
          status: "ACTIVE",
        },
      });

    await tx.vehicle.update({
      where: {
        id: Number(data.vehicleId),
      },
      data: {
        status: "IN_SHOP",
      },
    });

    return maintenance;
  });
};

export const completeMaintenance = async (
  id: number
) => {
  const maintenance =
    await maintenanceRepository.findById(id);

  if (!maintenance) {
    throw new Error("Maintenance record not found");
  }

  if (maintenance.status !== "ACTIVE") {
    throw new Error(
      "Maintenance is already completed"
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedMaintenance =
      await tx.maintenanceLog.update({
        where: { id },
        data: {
          status: "COMPLETED",
          endDate: new Date(),
        },
      });

    await tx.vehicle.update({
      where: {
        id: maintenance.vehicleId,
      },
      data: {
        status: "AVAILABLE",
      },
    });

    return updatedMaintenance;
  });
};