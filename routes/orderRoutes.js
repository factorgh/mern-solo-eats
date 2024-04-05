import express from "express";
import { jwtCheck, jwtParse } from "../midlleware/auth.js";
import OrderController from "../controllers/orderController.js";

const router = express.Router();

router.get("/", jwtCheck, jwtParse, OrderController.getMyOrders);
router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  OrderController.createCheckoutSession
);

router.post("/checkout/webhook", OrderController.stripeWebhookHandler);

export default router;
