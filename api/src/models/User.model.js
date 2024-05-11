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
  status: {
    type: String,
    enum: ["active", "banned"],
    default: "active",
    validate: {
      validator: function (v) {
        return ["active", "banned"].includes(v);
      },
      message: "Unsupported value for status",
    },
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
  profileImage: {
    type: String,
    default: "",
  },
  telUser: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[0-9()+\s-]+$/.test(v);
      },
      message: "Invalid phone number format for telUser",
    },
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
