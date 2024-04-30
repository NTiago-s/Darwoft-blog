import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  publication: {
    type: Schema.Types.ObjectId,
    ref: "Publication", // Nombre del modelo de publicación
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // Nombre del modelo de usuario
  },
});

export const Comment = model("Comment", commentSchema);
