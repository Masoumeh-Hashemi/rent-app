import { Schema, model } from "mongoose";

const favoriteSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  house_id: { type: Schema.Types.ObjectId, ref: "House", required: true },
});

export const Favorite = model("Favorite", favoriteSchema);
