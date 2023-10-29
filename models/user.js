import { Schema, models, model } from "mongoose";

const userSchema = Schema({
  fullname: {
    type: String,
    trim: true,
    required: true,
  },
  gender: {
    type: String,
    trim: true,
    required: true,
  },

  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    trim: true,
    required: true,
  },
  isAdmin: {
    type: Boolean,
  },
});

export default models.User || model("User", userSchema);
