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
import { handleFileUpload } from "../middlewares/fileSize.js";

const router = Router();

router.get("/:id", getPublication);
router.get("/", getPublications);
router.put("/update", authMiddleware, handleFileUpload, updatePublication);
router.post("/create", handleFileUpload, createPublication);
router.delete("/delete", deletePublication);

export default router;
