import { Router } from "express";
import {
  getPublications,
  createPublication,
  updatePublication,
  deletePublication,
} from "../controllers/comments/comments.controller";
const router = Router();

//Rutas publicas
router.get("/", getPublications);
router.put("/update", updatePublication);
router.post("/create", createPublication);
router.delete("/delete", deletePublication);
export default router;
