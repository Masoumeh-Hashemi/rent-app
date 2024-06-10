import autoIncrement from "mongoose-auto-increment";
import { Schema, model } from "mongoose";
const userSchema = new Schema({
  user_name: { type: String, required: true },
  profile_photo: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone_number: { type: String, required: true },
});
export const User = model("User", userSchema);
