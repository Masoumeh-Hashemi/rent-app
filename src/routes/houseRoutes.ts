import { Router } from "express";
import {
  createHouseController,
  getHousesByLocationController,
} from "../controllers/houseController";

const router = Router();

router.get("/search", getHousesByLocationController);
router.post("/create", createHouseController);
export default router;
