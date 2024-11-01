import mongoose from "mongoose";
import fs from "fs";
import csv from "csv-parser";
import Booking from "../models/booking.js";
import { fileURLToPath } from "url";
import path from "path";
import { connectDb } from "../config/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const csvFilePath = path.resolve(__dirname, "../data/hotel_bookings_1000.csv");

connectDb();

const parseDate = (year, month, day) => {
  const dateString = `${year}-${month}-${day}`;
  return new Date(dateString);
};

const uploadCsvToMongo = async () => {
  const bookings = [];

  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      const date = parseDate(
        row.arrival_date_year,
        row.arrival_date_month,
        row.arrival_date_day_of_month
      );

      const booking = {
        date,
        adults: parseInt(row.adults, 10),
        children: parseInt(row.children || "0", 10),
        babies: parseInt(row.babies || "0", 10),
        country: row.country,
      };

      bookings.push(booking);
    })
    .on("end", async () => {
      try {
        await Booking.insertMany(bookings);
        console.log("CSV uploaded successfully");
      } catch (error) {
        console.log(error.message);
      } finally {
        mongoose.connection.close();
      }
    });
};

uploadCsvToMongo();
