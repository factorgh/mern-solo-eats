import express from "express";
import controllers from "../controllers/myUser.js";
import { jwtCheck, jwtParse } from "../midlleware/auth.js";
import { validateMyUserRequest } from "../midlleware/validation.js";

const router = express.Router();

router.post("/", jwtCheck, controllers.createMyUser);
router.put(
  "/",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  controllers.updateMyUser
);

router.get("/", jwtCheck, jwtParse, controllers.getMyCurrentUser);

export default router;
