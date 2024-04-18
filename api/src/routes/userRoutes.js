import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getUsers,
  activeUser,
  profile,
  resetPasswordController,
  prevResetPassword,
} from "../controllers/user/user.controller.js";
import {
  authMiddleware,
  authResetPassword,
} from "../middlewares/auth.middleware.js";

const router = Router();

//Rutas publicas
router.get("/", getUsers);
router.get("/profile", authMiddleware, profile);
router.get("/active", activeUser);
router.put("/", authMiddleware, updateUser);
router.post("/prevresetpassword", prevResetPassword);
router.put("/resetpassword", authResetPassword, resetPasswordController);
router.delete("/", authResetPassword, deleteUser);
export default router;
