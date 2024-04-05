import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoutes from "./routes/myUser.js";
import myRestaurantRoutes from "./routes/MyRestaurant.js";
import cloudinary from "cloudinary";
import restaurantRoutes from "./routes/restaurant.js";
import OrderRoutes from "./routes/orderRoutes.js";

///CLOUDINARY SETUP
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_APP_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//MONGODB CONNECTION
mongoose
  .connect(process.env.MONGODB_URL_STRING)
  .then(() => console.log("Database connected successfully"));

const app = express();
app.use(cors());
app.use(express.json());

///
app.get("/health", (req, res) => {
  res.send({ message: "health ok !" });
});

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));
app.use("/api/v1/user", myUserRoutes);
app.use("/api/v1/restaurant", myRestaurantRoutes);
app.use("/api/v1/my/restaurant", restaurantRoutes);
app.use("/api/v1/order", OrderRoutes);

app.listen(5000, () => {
  console.log("Sever started on port 5000");
});
