import { Schema, model } from "mongoose";

const bookingSchema = new Schema({
  guest_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  host_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  house_id: { type: Schema.Types.ObjectId, ref: "House", required: true },
  total_price: { type: Number, required: true },
});

export const Booking = model("Booking", bookingSchema);
