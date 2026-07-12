import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import errorHandler from "./middleware/errorHandler";
import driverRoutes from "./routes/driver.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverRoutes);
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "TransitOps API running",
  });
});

app.use(errorHandler);

export default app;