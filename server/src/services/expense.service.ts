import * as expenseRepository from "../repositories/expense.repository";
import * as vehicleRepository from "../repositories/vehicle.repository";
// import * as tripRepository from "../repositories/trip.repository"; // Not strictly required if we just trust the DB foreign key for now, but good practice

export const getExpenses = async () => {
  return expenseRepository.findAll();
};

export const getExpenseById = async (id: number) => {
  if (Number.isNaN(id)) {
    throw new Error("Invalid expense ID");
  }

  const expense = await expenseRepository.findById(id);

  if (!expense) {
    throw new Error("Expense not found");
  }

  return expense;
};

export const createExpense = async (data: any) => {
  const {
    vehicleId,
    tripId,
    expenseType,
    amount,
    description,
    expenseDate,
  } = data;

  if (
    !vehicleId ||
    !expenseType ||
    amount === undefined ||
    !expenseDate
  ) {
    throw new Error(
      "vehicleId, expenseType, amount, and expenseDate are required"
    );
  }

  // Validate vehicle exists
  const vehicle = await vehicleRepository.findById(Number(vehicleId));
  if (!vehicle) {
    throw new Error("Vehicle not found");
  }

  return expenseRepository.create({
    vehicleId: Number(vehicleId),
    ...(tripId && { tripId: Number(tripId) }),
    expenseType,
    amount: Number(amount),
    ...(description && { description }),
    expenseDate: new Date(expenseDate),
  });
};

export const updateExpense = async (id: number, data: any) => {
  await getExpenseById(id);

  const updateData = {
    ...(data.vehicleId && { vehicleId: Number(data.vehicleId) }),
    ...(data.tripId && { tripId: Number(data.tripId) }),
    ...(data.expenseType && { expenseType: data.expenseType }),
    ...(data.amount !== undefined && { amount: Number(data.amount) }),
    ...(data.description !== undefined && { description: data.description }),
    ...(data.expenseDate && { expenseDate: new Date(data.expenseDate) }),
  };

  return expenseRepository.update(id, updateData);
};

export const deleteExpense = async (id: number) => {
  await getExpenseById(id);
  return expenseRepository.remove(id);
};
