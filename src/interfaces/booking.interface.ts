import { Types } from "mongoose";

export interface IBooking {
  guest_id: Types.ObjectId;
  host_id: Types.ObjectId;
  house_id: Types.ObjectId;
  total_price: number;
}
