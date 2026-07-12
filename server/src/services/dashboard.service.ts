import prisma from "../config/prisma";

export const getDashboard = async () => {
  const [
    totalVehicles,
    availableVehicles,
    vehiclesOnTrip,
    vehiclesInShop,

    totalDrivers,
    availableDrivers,
    driversOnTrip,

    draftTrips,
    activeTrips,
    completedTrips,

    expenseAggregate,
    fuelAggregate,
    maintenanceAggregate,
  ] = await Promise.all([
    prisma.vehicle.count(),

    prisma.vehicle.count({
      where: { status: "AVAILABLE" },
    }),

    prisma.vehicle.count({
      where: { status: "ON_TRIP" },
    }),

    prisma.vehicle.count({
      where: { status: "IN_SHOP" },
    }),

    prisma.driver.count(),

    prisma.driver.count({
      where: { status: "AVAILABLE" },
    }),

    prisma.driver.count({
      where: { status: "ON_TRIP" },
    }),

    prisma.trip.count({
      where: { status: "DRAFT" },
    }),

    prisma.trip.count({
      where: { status: "DISPATCHED" },
    }),

    prisma.trip.count({
      where: { status: "COMPLETED" },
    }),

    prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
    }),

    prisma.fuelLog.aggregate({
      _sum: {
        cost: true,
      },
    }),

    prisma.maintenanceLog.aggregate({
      _sum: {
        cost: true,
      },
    }),
  ]);

  return {
    fleet: {
      totalVehicles,
      available: availableVehicles,
      onTrip: vehiclesOnTrip,
      inShop: vehiclesInShop,
    },

    drivers: {
      total: totalDrivers,
      available: availableDrivers,
      onTrip: driversOnTrip,
    },

    trips: {
      draft: draftTrips,
      active: activeTrips,
      completed: completedTrips,
    },

    financials: {
      totalExpenses: Number(
        expenseAggregate._sum.amount || 0
      ),
      fuelCost: Number(
        fuelAggregate._sum.cost || 0
      ),
      maintenanceCost: Number(
        maintenanceAggregate._sum.cost || 0
      ),
    },
  };
};