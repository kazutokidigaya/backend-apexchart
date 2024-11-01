import mongoose from "mongoose";

// Directly assign MONGO_URI for testing purposes
const MONGO_URI =
  "mongodb+srv://user:user123@cluster0.xipm7.mongodb.net/csv-hotel-dash-admin?retryWrites=true&w=majority&appName=Cluster0";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI); // Use hardcoded MONGO_URI here
    if (conn) {
      console.log("MongoDB connected successfully");
      console.log(conn.connections[0].host);
    }
  } catch (error) {
    console.error("Database connection error:", error.message);
  }
};
