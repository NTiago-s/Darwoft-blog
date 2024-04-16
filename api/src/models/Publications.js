import { Schema, model } from "mongoose";

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Zá-úÁ-Ú\s]+$/.test(v);
      },
      message: "Invalid firstName format",
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Zá-úÁ-Ú\s]+$/.test(v);
      },
      message: "Invalid lastName format",
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: function (v) {
        // Simplified email validation using a regular expression
        return /\S+@\S+\.\S+/.test(v);
      },
      message: "Invalid email format",
    },
  },
  password: {
    type: String,
    required: true,
  },
  login: {
    type: Boolean,
    required: true,
    default: false,
  },
  state: {
    type: String,
    enum: ["pending", "active"],
    default: "pending",
    validate: {
      validator: function (v) {
        return ["pending", "active"].includes(v);
      },
      message: "Unsupported value for status",
    },
  },
  image: {
    type: Buffer,
  },
  role: {
    type: String,
    enum: ["client", "admin"],
    default: "client",
    validate: {
      validator: function (v) {
        return ["client", "admin"].includes(v);
      },
      message: "Unsupported value for role",
    },
  },
});

export const User = model("User", userSchema);
