import { Router } from "express";
import {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from "../controllers/publications/publications.controller.js";

const router = Router();

router.get("/", getPublications);
router.put("/update", updatePublication);
router.post("/create", createPublication);
router.delete("/delete", deletePublication);
export default router;
