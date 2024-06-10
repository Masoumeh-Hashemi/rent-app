import { Favorite } from "../models/favorite";
import { User } from "../models/user";
import { House } from "../models/house";
import { CreateFavoriteDTO } from "../dtos/favoriteDto/addFavorite.dto";
import { IFavorite } from "../interfaces/favorite.interface";
import { Types } from "mongoose";

export const addFavorite = async (favoriteData: CreateFavoriteDTO) => {
  const { user_id, house_id } = favoriteData;
  // Check if the user_id is a valid ObjectId
  if (!Types.ObjectId.isValid(user_id)) {
    throw new Error("Invalid user ID");
  }

  // Check if the house_id is a valid ObjectId
  if (!Types.ObjectId.isValid(house_id)) {
    throw new Error("Invalid house ID");
  }
  // Check if the user exists
  const userExists = await User.exists({ _id: user_id });
  if (!userExists) {
    throw new Error("User not found");
  }

  // Check if the house exists
  const houseExists = await House.exists({ _id: house_id });
  if (!houseExists) {
    throw new Error("House not found");
  }

  // Create and save the new favorite
  const newFavorite = new Favorite(favoriteData);
  const savedFavorite = await newFavorite.save();
  if (savedFavorite) {
    const favorite: IFavorite = {
      _id: savedFavorite._id.toString(),
      user_id: savedFavorite.user_id.toString(),
      house_id: savedFavorite.house_id.toString(),
    };
    return favorite;
  } else {
    return null;
  }
};
