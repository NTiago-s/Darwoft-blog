import mongoose from "mongoose";
import "dotenv/config";

const { CONNECTION_STRING } = process.env;

mongoose
  .connect(CONNECTION_STRING)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.error(err);
  });
