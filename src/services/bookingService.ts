import { Booking } from "../models/booking";
import { User } from "../models/user";
import { House } from "../models/house";
import { CreateBookingDTO } from "../dtos/bookingDto/createBooking.dto";

export const createBooking = async (bookingData: CreateBookingDTO) => {
  const { guest_id, host_id, house_id } = bookingData;

  // Check if the guest exists
  const guestExists = await User.exists({ _id: guest_id });
  if (!guestExists) {
    throw new Error("Guest not found");
  }

  // Check if the host exists
  const hostExists = await User.exists({ _id: host_id });
  if (!hostExists) {
    throw new Error("Host not found");
  }

  // Check if the house exists
  const houseExists = await House.exists({ _id: house_id });
  if (!houseExists) {
    throw new Error("House not found");
  }

  const newBooking = new Booking(bookingData);
  const savedBooking = await newBooking.save();
  return savedBooking;
};
