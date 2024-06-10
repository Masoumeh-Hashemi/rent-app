import { Router } from "express";
import { addFavoriteController } from "../controllers/favoriteController";

const router = Router();

router.post("/add", addFavoriteController);

export default router;
