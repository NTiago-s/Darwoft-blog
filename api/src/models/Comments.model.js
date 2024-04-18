import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

export const Comment = model("Comment", commentSchema);
