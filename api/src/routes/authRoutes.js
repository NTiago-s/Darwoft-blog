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
} from "../controllers/auth.controller.js";

const router = Router();

// ruta para el registro de usuario cliente
router.post(
  "/register/client",
  verifyDataRegisterClient,
  async (req, res, next) => {
    try {
      // Procesa el registro del usuario y genera un token de verificación
      const newUser = await registerUsers(req.body);
      res.status(200).send(newUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.post(
  "/register/admin",
  verifyDataRegisterAdmin,
  async (req, res, next) => {
    try {
      const newUser = await registerUsers(req.body);
      res.status(200).send(newUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);
// ruta para inisiar sesión
router.put("/login", verifyDataLogin, async (req, res, next) => {
  const { email } = req.body;
  try {
    const loginUser = await loginUsers(email.toLowerCase());
    res.status(200).json(loginUser);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// ruta para cerrar sesión
router.put(
  "/logout",
  authResetPassword,
  verifyUserLogout,
  async (req, res, next) => {
    try {
      const logoutUser = await logout(req.body.userId);
      res.status(200).json(logoutUser);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router.get("/user/client", authMiddleware, authUserRolClient, (_req, res) => {
  res.send(true);
});

router.get("/user/admin", authMiddleware, authUserRolAdmin, (_req, res) => {
  res.send(true);
});

export default router;
