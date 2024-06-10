import { Request, Response } from "express";
import { createBooking } from "../services/bookingService";
import { CreateBookingDTO } from "../dtos/bookingDto/createBooking.dto";
import { ApiResponse } from "../shared/apiResponse";
import { IBooking } from "../interfaces/booking.interface";

export const createBookingController = async (req: Request, res: Response) => {
  try {
    const bookingData: CreateBookingDTO = req.body;
    const savedBooking = await createBooking(bookingData);
    const response: ApiResponse<IBooking> = {
      success: true,
      data: savedBooking,
    };
    res.status(201).json(response);
  } catch (error) {
    const err = error as Error;
    const response: ApiResponse<null> = { success: false, error: err.message };
    res.status(500).json(response);
  }
};
