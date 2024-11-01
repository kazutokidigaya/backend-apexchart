import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  adults: { type: Number, required: true },
  children: { type: Number, required: true },
  babies: { type: Number, required: true },
  country: { type: String, required: true },
});

const Booking = mongoose.model("Booking", BookingSchema);

export default Booking;
