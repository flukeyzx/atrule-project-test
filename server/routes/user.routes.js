import { Router } from "express";
import {
  login,
  logout,
  signup,
  getProfile,
} from "../controllers/user.controller.js";
import isAuthorized from "../middlewares/isAuthorized.middleware.js";

const router = Router();

router.get("/profile", isAuthorized, getProfile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", isAuthorized, logout);

export default router;
