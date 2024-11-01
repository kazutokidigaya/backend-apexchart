import Booking from "../models/booking.js";

export const getBookings = async (req, res) => {
  const { startDate, endDate } = req.query;
  console.log(startDate, endDate);

  const start = new Date(startDate);
  const end = new Date(endDate);

  try {
    const bookings = await Booking.find({
      date: { $gte: start, $lte: end },
    });

    res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.error(error.message);
  }
};
