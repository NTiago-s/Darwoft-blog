import { Schema, model } from "mongoose";

const publicationSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Zá-úÁ-Ú\s]+$/.test(v);
      },
      message: "Invalid title format",
    },
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  themes: [String],
});

export const Publication = model("Publication", publicationSchema);
