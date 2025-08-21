import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/order.controller.js";
import {Router} from 'express';
import authMiddleware from "../middlewares/auth.js";

const orderRouter = Router();

orderRouter.post("/place-order",authMiddleware,placeOrder);
orderRouter.post("/verify-order",verifyOrder);
orderRouter.post("/userorders",authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);

export default orderRouter;