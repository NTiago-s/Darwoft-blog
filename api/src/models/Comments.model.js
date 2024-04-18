import { Schema, model } from "mongoose";

const commentSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Zá-úÁ-Ú\s]+$/.test(v);
      },
      message: "Invalid firstName format",
    },
  },
  description: {
    type: String,
    required: true,
  },
});

export const Comment = model("Comment", commentSchema);
