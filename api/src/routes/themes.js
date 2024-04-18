import { Router } from "express";
import {
  getThemes,
  createThemes,
  updateThemes,
  deleteThemes,
} from "../controllers/themes/themes.controller.js";

const router = Router();

router.get("/", getThemes);
router.put("/update", updateThemes);
router.post("/create", createThemes);
router.delete("/delete", deleteThemes);
export default router;
