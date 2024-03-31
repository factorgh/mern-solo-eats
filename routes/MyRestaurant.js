import express, { Router } from "express";
import controller from "../controllers/myRestaurant.js";
import { jwtCheck, jwtParse } from "../midlleware/auth.js";
import multer from "multer";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

router.post(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),

  controller.createMyRestaurant
);
router.get("/", jwtCheck, jwtParse, controller.getMyRestaurant);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  controller.updateMyRestaurant
);

export default router;
