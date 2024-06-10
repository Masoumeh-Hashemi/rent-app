import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import bookingRoutes from "./routes/bookingRoutes";
import favoriteRoutes from "./routes/favoriteRoutes";
import setupSwagger from "./swagger";
import houseRoutes from "./routes/houseRoutes";

dotenv.config();

const app = express();

app.use(express.json());
setupSwagger(app);

app.use("/users", userRoutes);
app.use("/houses", houseRoutes);
app.use("/bookings", bookingRoutes);
app.use("/favorites", favoriteRoutes);

export default app;
