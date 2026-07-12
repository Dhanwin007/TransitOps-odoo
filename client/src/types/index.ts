// User & Auth Types
export type UserRole = 'Admin' | 'Fleet Manager' | 'Driver' | 'Safety Officer' | 'Financial Analyst';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

// Vehicle Types
export type VehicleStatus = 'Active' | 'Available' | 'In Maintenance' | 'Inactive';
export type VehicleType = 'Truck' | 'Van' | 'Bus' | 'Pickup' | 'Tanker' | 'Trailer';

export interface Vehicle {
  id: string;
  registrationNumber: string;
  make: string;
  model: string;
  year: number;
  type: VehicleType;
  capacity: number;
  status: VehicleStatus;
  lastService: string;
  mileage: number;
  fuelType: string;
}

// Driver Types
export type DriverStatus = 'On Duty' | 'Off Duty' | 'On Leave' | 'Suspended';

export interface Driver {
  id: string;
  name: string;
  email: string;
  phone: string;
  licenseNumber: string;
  licenseExpiry: string;
  status: DriverStatus;
  safetyScore: number;
  tripsCompleted: number;
  joinedDate: string;
}

// Trip Types
export type TripStatus = 'Active' | 'Completed' | 'Pending' | 'Cancelled' | 'Delayed';
export type CargoType = 'General' | 'Perishable' | 'Hazardous' | 'Electronics' | 'Fragile' | 'Bulk';

export interface Trip {
  id: string;
  vehicleId: string;
  vehicleReg: string;
  driverId: string;
  driverName: string;
  source: string;
  destination: string;
  cargo: CargoType;
  cargoWeight: number;
  status: TripStatus;
  startDate: string;
  endDate?: string;
  distance: number;
  revenue: number;
}

// Maintenance Types
export type MaintenanceStatus = 'Scheduled' | 'In Progress' | 'Completed' | 'Overdue';
export type ServiceType = 'Oil Change' | 'Tyre Replacement' | 'Brake Service' | 'Engine Overhaul' | 'Transmission Service' | 'AC Service' | 'Full Service';

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  vehicleReg: string;
  serviceType: ServiceType;
  scheduledDate: string;
  completedDate?: string;
  status: MaintenanceStatus;
  cost: number;
  technician: string;
  notes: string;
}

// Fuel & Expense Types
export type ExpenseCategory = 'Fuel' | 'Toll' | 'Parking' | 'Repair' | 'Insurance' | 'Other';

export interface FuelLog {
  id: string;
  vehicleId: string;
  vehicleReg: string;
  driverName: string;
  date: string;
  liters: number;
  pricePerLiter: number;
  totalCost: number;
  odometer: number;
  fuelStation: string;
}

export interface ExpenseLog {
  id: string;
  vehicleId: string;
  vehicleReg: string;
  category: ExpenseCategory;
  description: string;
  amount: number;
  date: string;
  approvedBy: string;
}

// Analytics Types
export interface FleetUtilizationData {
  month: string;
  utilization: number;
}

export interface FuelCostData {
  month: string;
  cost: number;
  liters: number;
}

export interface TripStatData {
  month: string;
  completed: number;
  pending: number;
  cancelled: number;
}

// Dashboard Stats
export interface DashboardStats {
  activeVehicles: number;
  availableVehicles: number;
  vehiclesInMaintenance: number;
  driversOnDuty: number;
  activeTrips: number;
  pendingTrips: number;
  fleetUtilization: number;
  totalRevenue: number;
}
