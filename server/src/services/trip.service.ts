import prisma from "../config/prisma";
import * as tripRepository from "../repositories/trip.repository";

export const getTrips = async () => {
  return tripRepository.findAll();
};

export const getTripById = async (id: number) => {
  const trip = await tripRepository.findById(id);

  if (!trip) {
    throw new Error("Trip not found");
  }

  return trip;
};

export const createTrip = async (
  data: any,
  userId: number
) => {
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: Number(data.vehicleId) },
  });

  const driver = await prisma.driver.findUnique({
    where: { id: Number(data.driverId) },
  });

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  if (!driver) {
    throw new Error("Driver not found");
  }

  return tripRepository.create({
    tripNo: data.tripNo,
    vehicleId: Number(data.vehicleId),
    driverId: Number(data.driverId),
    source: data.source,
    destination: data.destination,
    cargoWeight: Number(data.cargoWeight),
    plannedDistance: Number(data.plannedDistance),
    estimatedTime: data.estimatedTime,
    createdBy: userId,
    status: "DRAFT",
  });
};

export const dispatchTrip = async (
  id: number,
  userId: number
) => {
  const trip = await getTripById(id);

  if (trip.status !== "DRAFT") {
    throw new Error("Only draft trips can be dispatched");
  }

  if (trip.vehicle.status !== "AVAILABLE") {
    throw new Error("Vehicle is not available");
  }

  if (trip.driver.status !== "AVAILABLE") {
    throw new Error("Driver is not available");
  }

  if (trip.driver.licenseExpiry < new Date()) {
    throw new Error("Driver licence has expired");
  }

  if (
    Number(trip.cargoWeight) >
    Number(trip.vehicle.maxCapacityKg)
  ) {
    throw new Error(
      "Cargo weight exceeds vehicle capacity"
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedTrip = await tx.trip.update({
      where: { id },
      data: {
        status: "DISPATCHED",
        startTime: new Date(),
      },
    });

    await tx.vehicle.update({
      where: { id: trip.vehicleId },
      data: {
        status: "ON_TRIP",
      },
    });

    await tx.driver.update({
      where: { id: trip.driverId },
      data: {
        status: "ON_TRIP",
      },
    });

    await tx.statusHistory.create({
      data: {
        entityType: "TRIP",
        entityId: id,
        oldStatus: "DRAFT",
        newStatus: "DISPATCHED",
        changedBy: userId,
        remarks: "Trip dispatched",
      },
    });

    return updatedTrip;
  });
};

export const completeTrip = async (
  id: number,
  data: any,
  userId: number
) => {
  const trip = await getTripById(id);

  if (trip.status !== "DISPATCHED") {
    throw new Error(
      "Only dispatched trips can be completed"
    );
  }

  return prisma.$transaction(async (tx) => {
    const updatedTrip = await tx.trip.update({
      where: { id },
      data: {
        status: "COMPLETED",
        actualDistance: Number(data.actualDistance),
        fuelUsed: Number(data.fuelUsed),
        endTime: new Date(),
      },
    });

    await tx.vehicle.update({
      where: { id: trip.vehicleId },
      data: {
        status: "AVAILABLE",
        odometer: {
          increment: Number(data.actualDistance),
        },
      },
    });

    await tx.driver.update({
      where: { id: trip.driverId },
      data: {
        status: "AVAILABLE",
      },
    });

    await tx.statusHistory.create({
      data: {
        entityType: "TRIP",
        entityId: id,
        oldStatus: "DISPATCHED",
        newStatus: "COMPLETED",
        changedBy: userId,
        remarks: "Trip completed",
      },
    });

    return updatedTrip;
  });
};