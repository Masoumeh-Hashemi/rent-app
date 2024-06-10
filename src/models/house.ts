import { Schema, model } from "mongoose";

const houseSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  price: { type: Number, required: true },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true },
  },
});

houseSchema.index({ location: "2dsphere" }); // Index for geospatial querying

export const House = model("House", houseSchema);
