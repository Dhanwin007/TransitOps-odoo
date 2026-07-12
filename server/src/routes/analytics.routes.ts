import express from "express";

import authenticate from "../middleware/auth";

const router = express.Router();

const fleetUtilization = [
	{ month: "Jan", utilization: 72 },
	{ month: "Feb", utilization: 68 },
	{ month: "Mar", utilization: 75 },
	{ month: "Apr", utilization: 80 },
	{ month: "May", utilization: 65 },
	{ month: "Jun", utilization: 71 },
	{ month: "Jul", utilization: 68 },
];

const fuelCosts = [
	{ month: "Jan", cost: 180000, liters: 1950 },
	{ month: "Feb", cost: 165000, liters: 1800 },
	{ month: "Mar", cost: 195000, liters: 2100 },
	{ month: "Apr", cost: 210000, liters: 2250 },
	{ month: "May", cost: 175000, liters: 1880 },
	{ month: "Jun", cost: 188000, liters: 2020 },
	{ month: "Jul", cost: 55526, liters: 600 },
];

const tripStats = [
	{ month: "Jan", completed: 45, pending: 5, cancelled: 2 },
	{ month: "Feb", completed: 38, pending: 8, cancelled: 3 },
	{ month: "Mar", completed: 52, pending: 4, cancelled: 1 },
	{ month: "Apr", completed: 61, pending: 6, cancelled: 4 },
	{ month: "May", completed: 49, pending: 9, cancelled: 2 },
	{ month: "Jun", completed: 55, pending: 7, cancelled: 3 },
	{ month: "Jul", completed: 12, pending: 2, cancelled: 1 },
];

const maintenanceCosts = [
	{ label: "Engine Overhaul", cost: 85000, color: "bg-red-500" },
	{ label: "Transmission Service", cost: 35000, color: "bg-amber-500" },
	{ label: "Brake Service", cost: 12000, color: "bg-blue-500" },
	{ label: "Tyre Replacement", cost: 28000, color: "bg-purple-500" },
	{ label: "Oil Change", cost: 4500, color: "bg-emerald-500" },
	{ label: "AC Service", cost: 6500, color: "bg-cyan-500" },
];

const insights = [
	{
		title: "Top Performing Driver",
		value: "Anwar Sheikh",
		detail: "Safety Score: 97/100 · 189 trips",
		color: "border-emerald-500/30 bg-emerald-500/5",
	},
	{
		title: "Most Active Vehicle",
		value: "UP-08-OP-0123",
		detail: "Scania R500 · 88,900 km",
		color: "border-blue-500/30 bg-blue-500/5",
	},
	{
		title: "Highest Revenue Route",
		value: "Nagpur → Hyderabad",
		detail: "₹42,000 per trip · 500 km",
		color: "border-amber-500/30 bg-amber-500/5",
	},
];

router.use(authenticate);

router.get("/fleet-utilization", (_req, res) => {
	res.json({ success: true, data: fleetUtilization });
});

router.get("/fuel-costs", (_req, res) => {
	res.json({ success: true, data: fuelCosts });
});

router.get("/trip-stats", (_req, res) => {
	res.json({ success: true, data: tripStats });
});

router.get("/maintenance-costs", (_req, res) => {
	res.json({ success: true, data: maintenanceCosts });
});

router.get("/insights", (_req, res) => {
	res.json({ success: true, data: insights });
});

export default router;
