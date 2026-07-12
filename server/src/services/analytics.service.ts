import prisma from "../config/prisma";

export const getAnalytics = async () => {
  const [
    totalVehicles,
    availableVehicles,
    onTripVehicles,
    inShopVehicles,

    totalDrivers,
    availableDrivers,
    onTripDrivers,

    draftTrips,
    dispatchedTrips,
    completedTrips,

    expenseAggregate,
    fuelAggregate,

    safetyAggregate,

    distanceAggregate,
  ] = await Promise.all([
    prisma.vehicle.count(),

    prisma.vehicle.count({
      where: {
        status: "AVAILABLE",
      },
    }),

    prisma.vehicle.count({
      where: {
        status: "ON_TRIP",
      },
    }),

    prisma.vehicle.count({
      where: {
        status: "IN_SHOP",
      },
    }),

    prisma.driver.count(),

    prisma.driver.count({
      where: {
        status: "AVAILABLE",
      },
    }),

    prisma.driver.count({
      where: {
        status: "ON_TRIP",
      },
    }),

    prisma.trip.count({
      where: {
        status: "DRAFT",
      },
    }),

    prisma.trip.count({
      where: {
        status: "DISPATCHED",
      },
    }),

    prisma.trip.count({
      where: {
        status: "COMPLETED",
      },
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

    prisma.driver.aggregate({
      _avg: {
        safetyScore: true,
      },
    }),

    prisma.trip.aggregate({
      _sum: {
        plannedDistance: true,
        actualDistance: true,
        fuelUsed: true,
      },
      where: {
        status: "COMPLETED",
      },
    }),
  ]);

  const totalActualDistance =
    Number(distanceAggregate._sum.actualDistance ?? 0);

  const totalFuelUsed =
    Number(distanceAggregate._sum.fuelUsed ?? 0);

  return {
    fleet: {
      totalVehicles,
      available: availableVehicles,
      onTrip: onTripVehicles,
      inShop: inShopVehicles,
    },

    drivers: {
      totalDrivers,
      available: availableDrivers,
      onTrip: onTripDrivers,
      averageSafetyScore: Number(
        safetyAggregate._avg.safetyScore ?? 0
      ).toFixed(2),
    },

    trips: {
      draft: draftTrips,
      dispatched: dispatchedTrips,
      completed: completedTrips,

      totalPlannedDistance: Number(
        distanceAggregate._sum.plannedDistance ?? 0
      ),

      totalActualDistance,
    },

    finance: {
      totalExpenses: Number(
        expenseAggregate._sum.amount ?? 0
      ),

      totalFuelCost: Number(
        fuelAggregate._sum.cost ?? 0
      ),
    },

    efficiency: {
      totalFuelUsed,

      averageMileage:
        totalFuelUsed === 0
          ? 0
          : Number(
              (
                totalActualDistance /
                totalFuelUsed
              ).toFixed(2)
            ),
    },
  };
}