import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getUsers,
  activeUser,
  profile,
  resetPasswordController,
  prevResetPassword,
  filterUsers,
} from "../controllers/user/user.controller.js";
import {
  authMiddleware,
  authResetPassword,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getUsers);
router.get("/search", authMiddleware, filterUsers);
router.get("/profile", authMiddleware, profile);
router.get("/active", activeUser);
router.put("/", authMiddleware, updateUser);
router.post("/prevresetpassword", prevResetPassword);
router.put("/resetpassword", authResetPassword, resetPasswordController);
router.delete("/", authResetPassword, deleteUser);
export default router;
