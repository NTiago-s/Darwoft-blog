import { Router } from "express";
import {
  getPublications,
  getPublication,
  filterPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from "../controllers/publications/publications.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import multer from "multer";

const router = Router();
const storage = multer.diskStorage({});
const upload = multer({ storage });

router.get("/:id", getPublication);
router.get("/", getPublications);
router.put(
  "/update",
  authMiddleware,
  upload.single("image"),
  updatePublication
);
router.post("/create", upload.single("image"), createPublication);
router.delete("/delete", deletePublication);

export default router;
