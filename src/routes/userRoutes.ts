import { Router } from "express";
import { wrapAsync } from "../middlewares/errorHandler";
import { getUserById } from "../controllers/userController";
import { createUser } from "../controllers/userController";
const router = Router();

router.get("/:id", getUserById);
router.post("/create", createUser);

export default router;
