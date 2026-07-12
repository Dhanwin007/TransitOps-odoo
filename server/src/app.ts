import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import driverRoutes from "./routes/driver.routes";
import tripRoutes from "./routes/trip.routes";
import maintenanceRoutes from "./routes/maintenance.routes";
<<<<<<< HEAD
<<<<<<< HEAD
import fuelRoutes from "./routes/fuel.routes";
import errorHandler from "./middleware/errorHandler";
=======
=======
>>>>>>> origin/main
import dashboardRoutes from "./routes/dashboard.routes";

import settingsRoutes from "./routes/settings.routes";

<<<<<<< HEAD
>>>>>>> 946a98cf714ce07766a51a96882ef37d4bc6b107
=======
>>>>>>> origin/main

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TransitOps API running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
<<<<<<< HEAD
app.use("/api/trips", tripRoutes);          // use the same path as main
app.use("/api/maintenance", maintenanceRoutes); // use the same path as main
app.use("/api/fuel", fuelRoutes);
=======
app.use("/api/trips", tripRoutes);
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/settings", settingsRoutes);

<<<<<<< HEAD
>>>>>>> 946a98cf714ce07766a51a96882ef37d4bc6b107
=======
>>>>>>> origin/main

app.use(errorHandler);

export default app;