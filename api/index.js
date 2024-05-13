import "./mongo.js";
import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

app.use(
  cors({
    // origin: "http://localhost:5173",
    origin: "https://darwoft-blog.onrender.com",
  })
);

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
