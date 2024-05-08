import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  publicationId: {
    type: Schema.Types.ObjectId,
    ref: "Publication",
    required: true,
  },
});

export const Comment = model("Comment", commentSchema);
