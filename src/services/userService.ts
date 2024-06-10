import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user";
export const createUser = async (userData: any) => {
  try {
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    return savedUser;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getUserById = async (userId: string) => {
  try {
    const userDoc = await User.findById(userId);
    if (userDoc) {
      const user: IUser = {
        user_name: userDoc.user_name,
        email: userDoc.email,
        password: userDoc.password,
        phone_number: userDoc.phone_number,
        profile_photo: userDoc.profile_photo?.toString(),
      };
      return user;
    } else {
      return null;
    }
  } catch (error) {
    throw new Error("Could not find user");
  }
};
