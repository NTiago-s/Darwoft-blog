import { Router } from "express";
import {
  getPublications,
  filterPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from "../controllers/publications/publications.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getPublications);
router.get("/filter", authMiddleware, filterPublications);
router.put("/update", updatePublication);
router.post("/create", createPublication);
router.delete("/delete", deletePublication);
export default router;
