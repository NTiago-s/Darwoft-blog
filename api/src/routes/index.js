import express from "express";
import authRouter from "./authRoutes.js";
import userRouter from "./userRoutes.js";
import themesRouter from "./themes.js";
import commentsRouter from "./comments.js";
import publicationsRouter from "./publications.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/themes", themesRouter);
router.use("/comments", commentsRouter);
router.use("/publications", publicationsRouter);

export default router;
