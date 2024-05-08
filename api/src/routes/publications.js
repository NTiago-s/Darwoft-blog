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

const router = Router();
router.get("/filter", authMiddleware, filterPublications);
router.get("/:id", getPublication);
router.get("/", getPublications);
router.put("/update", updatePublication);
router.post("/create", createPublication);
router.delete("/delete", deletePublication);

export default router;
