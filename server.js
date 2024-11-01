import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from "cors";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());
app.use("/api", bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
