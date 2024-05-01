import mongoose from "mongoose";
import "dotenv/config";

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });
