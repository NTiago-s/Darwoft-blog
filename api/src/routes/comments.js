import { Router } from "express";
import {
  getComments,
  createComment,
  updateComment,
  deleteComment,
} from "../controllers/comments/comments.controller";
const router = Router();

//Rutas publicas
router.get("/", getComments);
router.put("/update", updateComment);
router.post("/create", createComment);
router.delete("/delete", deleteComment);
export default router;
