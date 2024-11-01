import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from "cors";
import http from "http";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.json());
app.use("/api", bookingRoutes);

const server = http.createServer(app);

// Set longer timeouts for Render’s requirements
server.keepAliveTimeout = 120 * 1000; // 120 seconds
server.headersTimeout = 120 * 1000; // 120 seconds

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  connectDb();
});
