import { Router } from "express";
import isAuthorized from "../middlewares/isAuthorized.middleware.js";
import { getCartItems, addItemToCart } from "../controllers/cart.controller.js";

const router = Router();

router.get("/", isAuthorized, getCartItems);
router.post("/", isAuthorized, addItemToCart);

export default router;
