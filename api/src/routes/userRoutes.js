import { Router } from "express";
import {
  addUser,
  updateUser,
  deleteUser,
  getUsers,
  activeUser,
  profile,
  resetPasswordController,
  prevResetPassword,
} from "../controllers/user.controller.js";
import {
  authMiddleware,
  authResetPassword,
} from "../middlewares/auth.middleware.js";

const router = Router();

//Rutas publicas
router.get("/", getUsers);
router.get("/profile", authMiddleware, profile);
router.post("/", addUser);
router.get("/active", activeUser);
router.put("/", authMiddleware, updateUser);
router.delete("/", authResetPassword, deleteUser);
router.post("/prevresetpassword", prevResetPassword);
router.put("/resetpassword", authResetPassword, resetPasswordController);
export default router;
