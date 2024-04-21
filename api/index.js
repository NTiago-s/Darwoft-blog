import "./mongo.js";
import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
