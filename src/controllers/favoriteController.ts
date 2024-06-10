import { Request, Response } from "express";
import { CreateFavoriteDTO } from "../dtos/favoriteDto/addFavorite.dto";
import { ApiResponse } from "../shared/apiResponse";
import { IFavorite } from "../interfaces/favorite.interface";
import * as favoriteService from "../services/favoriteService";

export const addFavoriteController = async (req: Request, res: Response) => {
  try {
    const favoriteData: CreateFavoriteDTO = req.body;
    const savedFavorite = await favoriteService.addFavorite(favoriteData);

    if (!savedFavorite) {
      const response: ApiResponse<null> = {
        success: false,
        error: "Favorite didn't added",
      };
      res.status(404).json(response);
    } else {
      const response: ApiResponse<IFavorite> = {
        success: true,
        data: savedFavorite,
      };
      res.status(201).json(response);
    }
  } catch (error) {
    const err = error as Error;
    const response: ApiResponse<null> = { success: false, error: err.message };
    res.status(500).json(response);
  }
};
