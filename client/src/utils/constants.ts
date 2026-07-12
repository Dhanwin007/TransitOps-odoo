// ============================================================
// Shared constants — mirrors backend enum/status conventions.
// Update here when backend adds new statuses.
// ============================================================

export const VEHICLE_STATUS = {
  ACTIVE:          'Active',
  AVAILABLE:       'Available',
  IN_MAINTENANCE:  'In Maintenance',
  INACTIVE:        'Inactive',
} as const;

export const DRIVER_STATUS = {
  ON_DUTY:   'On Duty',
  OFF_DUTY:  'Off Duty',
  ON_LEAVE:  'On Leave',
  SUSPENDED: 'Suspended',
} as const;

export const TRIP_STATUS = {
  ACTIVE:    'Active',
  COMPLETED: 'Completed',
  PENDING:   'Pending',
  CANCELLED: 'Cancelled',
  DELAYED:   'Delayed',
} as const;

export const MAINTENANCE_STATUS = {
  SCHEDULED:   'Scheduled',
  IN_PROGRESS: 'In Progress',
  COMPLETED:   'Completed',
  OVERDUE:     'Overdue',
} as const;

export const VEHICLE_TYPES = ['Truck', 'Van', 'Bus', 'Pickup', 'Tanker', 'Trailer'] as const;

export const CARGO_TYPES = ['General', 'Perishable', 'Hazardous', 'Electronics', 'Fragile', 'Bulk'] as const;

export const SERVICE_TYPES = [
  'Oil Change',
  'Tyre Replacement',
  'Brake Service',
  'Engine Overhaul',
  'Transmission Service',
  'AC Service',
  'Full Service',
] as const;

export const EXPENSE_CATEGORIES = ['Fuel', 'Toll', 'Parking', 'Repair', 'Insurance', 'Other'] as const;

export const USER_ROLES = {
  ADMIN:             'Admin',
  FLEET_MANAGER:     'Fleet Manager',
  DRIVER:            'Driver',
  SAFETY_OFFICER:    'Safety Officer',
  FINANCIAL_ANALYST: 'Financial Analyst',
} as const;

export const FUEL_TYPES = ['Diesel', 'Petrol', 'CNG', 'Electric'] as const;
