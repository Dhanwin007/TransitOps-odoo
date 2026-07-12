import type {
  Vehicle,
  Driver,
  Trip,
  MaintenanceRecord,
  FuelLog,
  ExpenseLog,
  DashboardStats,
  FleetUtilizationData,
  FuelCostData,
  TripStatData,
  User,
} from '../types';

// Mock Users
export const mockUsers: User[] = [
  { id: 'u1', name: 'Alex Johnson', email: 'admin@transitops.com', role: 'Admin' },
  { id: 'u2', name: 'Sarah Williams', email: 'fleet@transitops.com', role: 'Fleet Manager' },
  { id: 'u3', name: 'Mike Davis', email: 'driver@transitops.com', role: 'Driver' },
  { id: 'u4', name: 'Emma Clark', email: 'safety@transitops.com', role: 'Safety Officer' },
  { id: 'u5', name: 'Robert Lee', email: 'finance@transitops.com', role: 'Financial Analyst' },
];

// Mock Vehicles
export const mockVehicles: Vehicle[] = [
  { id: 'v1', registrationNumber: 'MH-01-AB-1234', make: 'Tata', model: 'Prima', year: 2022, type: 'Truck', capacity: 25, status: 'Active', lastService: '2026-05-15', mileage: 45200, fuelType: 'Diesel' },
  { id: 'v2', registrationNumber: 'MH-02-CD-5678', make: 'Ashok Leyland', model: 'Dost', year: 2021, type: 'Van', capacity: 2, status: 'Available', lastService: '2026-06-01', mileage: 32100, fuelType: 'Diesel' },
  { id: 'v3', registrationNumber: 'DL-03-EF-9012', make: 'Mahindra', model: 'Furio', year: 2023, type: 'Truck', capacity: 15, status: 'Active', lastService: '2026-04-20', mileage: 18750, fuelType: 'Diesel' },
  { id: 'v4', registrationNumber: 'KA-04-GH-3456', make: 'Volvo', model: 'FH16', year: 2022, type: 'Truck', capacity: 30, status: 'In Maintenance', lastService: '2026-07-01', mileage: 67800, fuelType: 'Diesel' },
  { id: 'v5', registrationNumber: 'TN-05-IJ-7890', make: 'Eicher', model: 'Pro 3015', year: 2021, type: 'Truck', capacity: 12, status: 'Active', lastService: '2026-05-30', mileage: 52300, fuelType: 'Diesel' },
  { id: 'v6', registrationNumber: 'GJ-06-KL-2345', make: 'Force', model: 'Traveller', year: 2023, type: 'Bus', capacity: 20, status: 'Available', lastService: '2026-06-10', mileage: 21000, fuelType: 'Diesel' },
  { id: 'v7', registrationNumber: 'RJ-07-MN-6789', make: 'Toyota', model: 'Hilux', year: 2022, type: 'Pickup', capacity: 1, status: 'Active', lastService: '2026-06-20', mileage: 31400, fuelType: 'Petrol' },
  { id: 'v8', registrationNumber: 'UP-08-OP-0123', make: 'Scania', model: 'R500', year: 2021, type: 'Tanker', capacity: 35, status: 'Active', lastService: '2026-05-05', mileage: 88900, fuelType: 'Diesel' },
  { id: 'v9', registrationNumber: 'WB-09-QR-4567', make: 'Isuzu', model: 'NPR', year: 2023, type: 'Truck', capacity: 8, status: 'Inactive', lastService: '2026-03-15', mileage: 14200, fuelType: 'Diesel' },
  { id: 'v10', registrationNumber: 'MP-10-ST-8901', make: 'Bharat Benz', model: '2523R', year: 2022, type: 'Trailer', capacity: 40, status: 'In Maintenance', lastService: '2026-07-05', mileage: 73500, fuelType: 'Diesel' },
];

// Mock Drivers
export const mockDrivers: Driver[] = [
  { id: 'd1', name: 'Rajan Kumar', email: 'rajan@transitops.com', phone: '+91-9876543210', licenseNumber: 'MH0120180012345', licenseExpiry: '2028-03-15', status: 'On Duty', safetyScore: 94, tripsCompleted: 342, joinedDate: '2020-01-15' },
  { id: 'd2', name: 'Suresh Patel', email: 'suresh@transitops.com', phone: '+91-9765432109', licenseNumber: 'GJ0120190023456', licenseExpiry: '2027-08-22', status: 'Off Duty', safetyScore: 88, tripsCompleted: 215, joinedDate: '2021-03-10' },
  { id: 'd3', name: 'Anwar Sheikh', email: 'anwar@transitops.com', phone: '+91-9654321098', licenseNumber: 'DL0220200034567', licenseExpiry: '2029-11-30', status: 'On Duty', safetyScore: 97, tripsCompleted: 189, joinedDate: '2022-05-20' },
  { id: 'd4', name: 'Pradeep Singh', email: 'pradeep@transitops.com', phone: '+91-9543210987', licenseNumber: 'UP0120180045678', licenseExpiry: '2026-12-01', status: 'On Leave', safetyScore: 79, tripsCompleted: 412, joinedDate: '2019-08-05' },
  { id: 'd5', name: 'Kiran Reddy', email: 'kiran@transitops.com', phone: '+91-9432109876', licenseNumber: 'TN0120210056789', licenseExpiry: '2030-05-18', status: 'On Duty', safetyScore: 91, tripsCompleted: 128, joinedDate: '2023-02-14' },
  { id: 'd6', name: 'Mohan Das', email: 'mohan@transitops.com', phone: '+91-9321098765', licenseNumber: 'KA0120190067890', licenseExpiry: '2027-09-25', status: 'Off Duty', safetyScore: 83, tripsCompleted: 267, joinedDate: '2020-11-28' },
  { id: 'd7', name: 'Rajesh Nair', email: 'rajesh@transitops.com', phone: '+91-9210987654', licenseNumber: 'KL0120220078901', licenseExpiry: '2031-02-14', status: 'Suspended', safetyScore: 55, tripsCompleted: 98, joinedDate: '2023-07-10' },
  { id: 'd8', name: 'Vijay Sharma', email: 'vijay@transitops.com', phone: '+91-9109876543', licenseNumber: 'RJ0120200089012', licenseExpiry: '2028-07-09', status: 'On Duty', safetyScore: 96, tripsCompleted: 315, joinedDate: '2021-09-18' },
];

// Mock Trips
export const mockTrips: Trip[] = [
  { id: 't1', vehicleId: 'v1', vehicleReg: 'MH-01-AB-1234', driverId: 'd1', driverName: 'Rajan Kumar', source: 'Mumbai', destination: 'Pune', cargo: 'General', cargoWeight: 18, status: 'Active', startDate: '2026-07-10', distance: 150, revenue: 12500 },
  { id: 't2', vehicleId: 'v3', vehicleReg: 'DL-03-EF-9012', driverId: 'd3', driverName: 'Anwar Sheikh', source: 'Delhi', destination: 'Jaipur', cargo: 'Electronics', cargoWeight: 8, status: 'Completed', startDate: '2026-07-08', endDate: '2026-07-09', distance: 280, revenue: 22000 },
  { id: 't3', vehicleId: 'v5', vehicleReg: 'TN-05-IJ-7890', driverId: 'd5', driverName: 'Kiran Reddy', source: 'Chennai', destination: 'Bangalore', cargo: 'Perishable', cargoWeight: 10, status: 'Active', startDate: '2026-07-11', distance: 350, revenue: 28000 },
  { id: 't4', vehicleId: 'v7', vehicleReg: 'RJ-07-MN-6789', driverId: 'd8', driverName: 'Vijay Sharma', source: 'Jaipur', destination: 'Ahmedabad', cargo: 'Fragile', cargoWeight: 0.8, status: 'Pending', startDate: '2026-07-13', distance: 420, revenue: 18500 },
  { id: 't5', vehicleId: 'v8', vehicleReg: 'UP-08-OP-0123', driverId: 'd1', driverName: 'Rajan Kumar', source: 'Kolkata', destination: 'Bhubaneswar', cargo: 'Bulk', cargoWeight: 32, status: 'Completed', startDate: '2026-07-05', endDate: '2026-07-06', distance: 440, revenue: 35000 },
  { id: 't6', vehicleId: 'v2', vehicleReg: 'MH-02-CD-5678', driverId: 'd2', driverName: 'Suresh Patel', source: 'Surat', destination: 'Mumbai', cargo: 'General', cargoWeight: 1.5, status: 'Cancelled', startDate: '2026-07-07', distance: 270, revenue: 0 },
  { id: 't7', vehicleId: 'v1', vehicleReg: 'MH-01-AB-1234', driverId: 'd6', driverName: 'Mohan Das', source: 'Nagpur', destination: 'Hyderabad', cargo: 'Hazardous', cargoWeight: 20, status: 'Pending', startDate: '2026-07-14', distance: 500, revenue: 42000 },
  { id: 't8', vehicleId: 'v3', vehicleReg: 'DL-03-EF-9012', driverId: 'd8', driverName: 'Vijay Sharma', source: 'Chandigarh', destination: 'Delhi', cargo: 'Electronics', cargoWeight: 6, status: 'Delayed', startDate: '2026-07-11', distance: 250, revenue: 19500 },
];

// Mock Maintenance Records
export const mockMaintenance: MaintenanceRecord[] = [
  { id: 'm1', vehicleId: 'v4', vehicleReg: 'KA-04-GH-3456', serviceType: 'Engine Overhaul', scheduledDate: '2026-07-01', status: 'In Progress', cost: 85000, technician: 'Ramesh Auto Works', notes: 'Full engine inspection and overhaul required after 67K km' },
  { id: 'm2', vehicleId: 'v10', vehicleReg: 'MP-10-ST-8901', serviceType: 'Transmission Service', scheduledDate: '2026-07-05', status: 'In Progress', cost: 35000, technician: 'Singh Motors', notes: 'Transmission slipping reported by driver' },
  { id: 'm3', vehicleId: 'v1', vehicleReg: 'MH-01-AB-1234', serviceType: 'Oil Change', scheduledDate: '2026-07-20', status: 'Scheduled', cost: 4500, technician: 'QuickService Garage', notes: 'Routine oil and filter change' },
  { id: 'm4', vehicleId: 'v5', vehicleReg: 'TN-05-IJ-7890', serviceType: 'Tyre Replacement', scheduledDate: '2026-07-18', status: 'Scheduled', cost: 28000, technician: 'Apollo Tyres Center', notes: 'Replace all 6 tyres, worn out' },
  { id: 'm5', vehicleId: 'v8', vehicleReg: 'UP-08-OP-0123', serviceType: 'Brake Service', scheduledDate: '2026-06-25', status: 'Completed', completedDate: '2026-06-26', cost: 12000, technician: 'Speedway Workshop', notes: 'Brake pads and discs replaced' },
  { id: 'm6', vehicleId: 'v2', vehicleReg: 'MH-02-CD-5678', serviceType: 'AC Service', scheduledDate: '2026-06-10', status: 'Completed', completedDate: '2026-06-11', cost: 6500, technician: 'CoolAir Auto', notes: 'AC gas refill and cleaning' },
  { id: 'm7', vehicleId: 'v9', vehicleReg: 'WB-09-QR-4567', serviceType: 'Full Service', scheduledDate: '2026-06-01', status: 'Overdue', cost: 25000, technician: 'City Auto Service', notes: 'Vehicle inactive, needs full servicing before redeployment' },
];

// Mock Fuel Logs
export const mockFuelLogs: FuelLog[] = [
  { id: 'f1', vehicleId: 'v1', vehicleReg: 'MH-01-AB-1234', driverName: 'Rajan Kumar', date: '2026-07-10', liters: 120, pricePerLiter: 92.5, totalCost: 11100, odometer: 45100, fuelStation: 'BPCL Highway Pump, Pune' },
  { id: 'f2', vehicleId: 'v3', vehicleReg: 'DL-03-EF-9012', driverName: 'Anwar Sheikh', date: '2026-07-08', liters: 80, pricePerLiter: 91.0, totalCost: 7280, odometer: 18650, fuelStation: 'HPCL Delhi North' },
  { id: 'f3', vehicleId: 'v5', vehicleReg: 'TN-05-IJ-7890', driverName: 'Kiran Reddy', date: '2026-07-11', liters: 95, pricePerLiter: 93.2, totalCost: 8854, odometer: 52200, fuelStation: 'IOC Chennai Bypass' },
  { id: 'f4', vehicleId: 'v8', vehicleReg: 'UP-08-OP-0123', driverName: 'Rajan Kumar', date: '2026-07-05', liters: 200, pricePerLiter: 90.8, totalCost: 18160, odometer: 88700, fuelStation: 'BPCL NH-6 Station' },
  { id: 'f5', vehicleId: 'v7', vehicleReg: 'RJ-07-MN-6789', driverName: 'Vijay Sharma', date: '2026-07-09', liters: 45, pricePerLiter: 102.5, totalCost: 4612, odometer: 31350, fuelStation: 'HP Petrol, Jaipur' },
  { id: 'f6', vehicleId: 'v2', vehicleReg: 'MH-02-CD-5678', driverName: 'Suresh Patel', date: '2026-07-06', liters: 60, pricePerLiter: 92.0, totalCost: 5520, odometer: 32050, fuelStation: 'Shell Station, Surat' },
];

// Mock Expense Logs
export const mockExpenseLogs: ExpenseLog[] = [
  { id: 'e1', vehicleId: 'v1', vehicleReg: 'MH-01-AB-1234', category: 'Toll', description: 'Mumbai-Pune Expressway Toll', amount: 850, date: '2026-07-10', approvedBy: 'Sarah Williams' },
  { id: 'e2', vehicleId: 'v3', vehicleReg: 'DL-03-EF-9012', category: 'Parking', description: 'Overnight parking at Delhi Freight Hub', amount: 500, date: '2026-07-08', approvedBy: 'Sarah Williams' },
  { id: 'e3', vehicleId: 'v4', vehicleReg: 'KA-04-GH-3456', category: 'Repair', description: 'Emergency roadside repair - fan belt', amount: 3200, date: '2026-07-01', approvedBy: 'Alex Johnson' },
  { id: 'e4', vehicleId: 'v8', vehicleReg: 'UP-08-OP-0123', category: 'Toll', description: 'NH-16 Toll Charges', amount: 1200, date: '2026-07-05', approvedBy: 'Sarah Williams' },
  { id: 'e5', vehicleId: 'v5', vehicleReg: 'TN-05-IJ-7890', category: 'Insurance', description: 'Annual insurance renewal premium', amount: 45000, date: '2026-07-01', approvedBy: 'Alex Johnson' },
  { id: 'e6', vehicleId: 'v7', vehicleReg: 'RJ-07-MN-6789', category: 'Other', description: 'Driver allowance and lodging', amount: 2500, date: '2026-07-09', approvedBy: 'Sarah Williams' },
];

// Dashboard Stats
export const mockDashboardStats: DashboardStats = {
  activeVehicles: 5,
  availableVehicles: 2,
  vehiclesInMaintenance: 2,
  driversOnDuty: 4,
  activeTrips: 2,
  pendingTrips: 2,
  fleetUtilization: 68,
  totalRevenue: 177500,
};

// Analytics Data
export const mockFleetUtilization: FleetUtilizationData[] = [
  { month: 'Jan', utilization: 72 },
  { month: 'Feb', utilization: 68 },
  { month: 'Mar', utilization: 75 },
  { month: 'Apr', utilization: 80 },
  { month: 'May', utilization: 65 },
  { month: 'Jun', utilization: 71 },
  { month: 'Jul', utilization: 68 },
];

export const mockFuelCostData: FuelCostData[] = [
  { month: 'Jan', cost: 180000, liters: 1950 },
  { month: 'Feb', cost: 165000, liters: 1800 },
  { month: 'Mar', cost: 195000, liters: 2100 },
  { month: 'Apr', cost: 210000, liters: 2250 },
  { month: 'May', cost: 175000, liters: 1880 },
  { month: 'Jun', cost: 188000, liters: 2020 },
  { month: 'Jul', cost: 55526, liters: 600 },
];

export const mockTripStatData: TripStatData[] = [
  { month: 'Jan', completed: 45, pending: 5, cancelled: 2 },
  { month: 'Feb', completed: 38, pending: 8, cancelled: 3 },
  { month: 'Mar', completed: 52, pending: 4, cancelled: 1 },
  { month: 'Apr', completed: 61, pending: 6, cancelled: 4 },
  { month: 'May', completed: 49, pending: 9, cancelled: 2 },
  { month: 'Jun', completed: 55, pending: 7, cancelled: 3 },
  { month: 'Jul', completed: 12, pending: 2, cancelled: 1 },
];
