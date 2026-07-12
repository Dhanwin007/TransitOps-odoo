import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import errorHandler from "./middleware/errorHandler";
import driverRoutes from "./routes/driver.routes";
import tripRoutes from "./routes/trip.routes";

const app = express();

app.use(cors());
app.use(express.json());

//app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "TransitOps API running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/trips", tripRoutes);

app.use(errorHandler);

export default app;