import { Router } from "express";
import { verifyDataLogin } from "../middlewares/verifyDataLogin.js";
import { verifyUserLogout } from "../middlewares/verifyUserLogout.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  verifyDataRegisterAdmin,
  verifyDataRegisterClient,
} from "../middlewares/verifyDataRegister.js";
import {
  loginUsers,
  logout,
  registerUsers,
} from "../controllers/auth/auth.controller.js";

const router = Router();

router.post("/register/client", verifyDataRegisterClient, registerUsers);
router.post("/register/admin", verifyDataRegisterAdmin, registerUsers);
router.put("/login", verifyDataLogin, loginUsers);
router.put("/logout", authMiddleware, verifyUserLogout, logout);

export default router;
