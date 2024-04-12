import "./mongo.js";
import express from "express";
import cors from "cors";
import router from "./src/routes/index.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors());

app.use(bodyParser.json({ limit: "10mb" }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
