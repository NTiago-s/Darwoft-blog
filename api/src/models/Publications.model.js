import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  themes: [{ type: Schema.Types.ObjectId, ref: "Theme" }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
});

export const Publication = model("Publication", publicationSchema);
