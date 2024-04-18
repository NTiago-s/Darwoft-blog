import { Schema, model } from "mongoose";

const themeSchema = new Schema({
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
    required: false,
  },
});

export const Theme = model("Theme", themeSchema);
