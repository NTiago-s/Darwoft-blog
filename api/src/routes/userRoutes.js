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
  adminEdit,
} from "../controllers/user/user.controller.js";
import {
  authMiddleware,
  authResetPassword,
} from "../middlewares/auth.middleware.js";
import { handleFileUpload } from "../middlewares/fileSize.js";

const router = Router();

router.get("/", getUsers);
router.get("/active", activeUser);
router.get("/profile", authMiddleware, profile);
router.get("/search", authMiddleware, filterUsers);
router.put("/", authMiddleware, handleFileUpload, updateUser);
router.put("/resetpassword", authResetPassword, resetPasswordController);
router.put("/editadmin", adminEdit);
router.post("/prevresetpassword", prevResetPassword);
router.delete("/", authMiddleware, deleteUser);

export default router;
