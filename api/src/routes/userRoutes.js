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
import multer from "multer";

const router = Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.get("/", getUsers);
router.get("/active", activeUser);
router.post("/prevresetpassword", prevResetPassword);
router.get("/profile", authMiddleware, profile);
router.put("/", authMiddleware, upload.single("image"), updateUser);
router.put("/resetpassword", authResetPassword, resetPasswordController);
router.get("/search", authMiddleware, filterUsers);
router.delete("/", authResetPassword, deleteUser);

export default router;
