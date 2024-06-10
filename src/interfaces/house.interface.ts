import { Document, ObjectId } from "mongoose";

interface Location {
  type: "Point";
  coordinates: [number, number];
}

interface IHouse extends Document {
  user_id: ObjectId;
  price: number;
  location: Location;
}

export { IHouse };
