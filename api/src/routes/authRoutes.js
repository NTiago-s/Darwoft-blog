import { Router } from "express";
import { verifyDataLogin } from "../middlewares/verifyDataLogin.js";
import { verifyUserLogout } from "../middlewares/verifyUserLogout.js";
import {
  authMiddleware,
  authResetPassword,
  authUserRolAdmin,
  authUserRolClient,
} from "../middlewares/auth.middleware.js";
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

// ruta para el registro de usuario cliente
router.post("/register/client", verifyDataRegisterClient, registerUsers);
router.post("/register/admin", verifyDataRegisterAdmin, registerUsers);

// ruta para iniciar sesión
router.put("/login", verifyDataLogin, loginUsers);

// ruta para cerrar sesión
router.put("/logout", authResetPassword, verifyUserLogout, logout);

export default router;
