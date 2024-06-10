import { Request, Response } from "express";
import { CreateHouseDTO } from "../dtos/houseDto/createHouse.dto";
import * as houseService from "../services/house.service";
import { ApiResponse } from "../shared/apiResponse";

export const getHousesByLocationController = async (
  req: Request,
  res: Response
) => {
  const latitude = Number(req.query.latitude);
  const longitude = Number(req.query.longitude);

  if (!latitude || !longitude) {
    const response: ApiResponse<null> = {
      success: false,
      error: "Latitude and Longitude are required",
    };
    return res.status(400).json(response);
  }

  try {
    const houses = await houseService.getHousesByLocation(latitude, longitude);
    const response: ApiResponse<typeof houses> = {
      success: true,
      data: houses,
    };
    res.json(response);
  } catch (error) {
    const err = error as Error;
    const response: ApiResponse<null> = { success: false, error: err.message };
    res.status(500).json(response);
  }
};

export const createHouseController = async (req: Request, res: Response) => {
  try {
    const houseData: CreateHouseDTO = req.body;
    const savedHouse = await houseService.createHouse(houseData);
    res.status(201).json(savedHouse);
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ error: err.message });
  }
};
