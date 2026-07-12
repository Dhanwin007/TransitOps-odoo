import * as vehicleRepository from "../repositories/vehicle.repository";

export const getVehicles = async () => {
  return vehicleRepository.findAll();
};

export const getVehicleById = async (id: number) => {
  if (Number.isNaN(id)) {
    throw new Error("Invalid vehicle ID");
  }

  const vehicle = await vehicleRepository.findById(id);

  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  return vehicle;
};

export const createVehicle = async (data: any) => {
  const {
    registrationNo,
    vehicleName,
    model,
    vehicleType,
    maxCapacityKg,
    odometer,
    acquisitionCost,
    purchaseDate,
  } = data;

  if (
    !registrationNo ||
    !vehicleName ||
    !model ||
    !vehicleType ||
    maxCapacityKg === undefined ||
    odometer === undefined ||
    acquisitionCost === undefined ||
    !purchaseDate
  ) {
    throw new Error("All vehicle fields are required");
  }

  const existingVehicle =
    await vehicleRepository.findByRegistration(
      registrationNo
    );

  if (existingVehicle) {
    throw new Error(
      "Vehicle registration number already exists"
    );
  }

  return vehicleRepository.create({
    registrationNo,
    vehicleName,
    model,
    vehicleType,
    maxCapacityKg: Number(maxCapacityKg),
    odometer: Number(odometer),
    acquisitionCost: Number(acquisitionCost),
    purchaseDate: new Date(purchaseDate),
    status: "AVAILABLE",
  });
};

export const updateVehicle = async (
  id: number,
  data: any
) => {
  await getVehicleById(id);

  const updateData = {
    ...data,
    ...(data.maxCapacityKg !== undefined && {
      maxCapacityKg: Number(data.maxCapacityKg),
    }),
    ...(data.odometer !== undefined && {
      odometer: Number(data.odometer),
    }),
    ...(data.acquisitionCost !== undefined && {
      acquisitionCost: Number(data.acquisitionCost),
    }),
    ...(data.purchaseDate && {
      purchaseDate: new Date(data.purchaseDate),
    }),
  };

  return vehicleRepository.update(id, updateData);
};

export const deleteVehicle = async (id: number) => {
  const vehicle = await getVehicleById(id);

  if (vehicle.status === "ON_TRIP") {
    throw new Error(
      "Cannot delete vehicle currently on a trip"
    );
  }

  if (vehicle.status === "IN_SHOP") {
    throw new Error(
      "Cannot delete vehicle currently in maintenance"
    );
  }

  return vehicleRepository.remove(id);
};