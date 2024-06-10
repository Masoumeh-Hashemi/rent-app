import { Request, Response } from "express";
import { CreateUserDTO } from "../dtos/userDtos/createUser.dto";
import * as userService from "../services/userService";
import { IUser } from "../interfaces/user.interface";
import { ApiResponse } from "../shared/apiResponse";

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await userService.getUserById(userId);
    if (!user) {
      const response: ApiResponse<null> = {
        success: false,
        error: "User not found",
      };
      res.status(404).json(response);
    } else {
      const response: ApiResponse<IUser> = { success: true, data: user };
      res.status(200).json(response);
    }
  } catch (error) {
    const err = error as Error;
    const response: ApiResponse<null> = { success: false, error: err.message };
    res.status(404).json(response);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDTO = req.body;
    //TODO: Validate userData here, e.g., check if required fields are present
    const savedUser = await userService.createUser(userData);
    res.status(201).json(savedUser);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
