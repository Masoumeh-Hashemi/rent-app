import { User } from "../models/user";
import { CreateHouseDTO } from "../dtos/houseDto/createHouse.dto";
import { House } from "../models/house";
import { Types } from "mongoose";

export const createHouse = async (houseData: CreateHouseDTO) => {
  try {
    if (!Types.ObjectId.isValid(houseData.user_id)) {
      throw new Error("Invalid user ID");
    }
    const userExists = await User.exists({ _id: houseData.user_id });
    if (userExists) {
      const newHouse = new House(houseData);
      const savedHouse = await newHouse.save();
      return savedHouse;
    } else {
      throw new Error("User not found");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getHousesByLocation = async (
  latitude: number,
  longitude: number,
  maxDistance: number = 1000 // default max distance in meters
) => {
  try {
    const houses = await House.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: maxDistance,
        },
      },
    });

    return houses;
  } catch (error) {
    throw new Error("Could not retrieve houses by location");
  }
};
