import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoutes from "./routes/myUser.js";

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
app.use("/api/v1/user", myUserRoutes);

app.listen(5000, () => {
  console.log("Sever started on port 5000");
});
