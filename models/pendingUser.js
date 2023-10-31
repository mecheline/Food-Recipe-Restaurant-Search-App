import { Schema, models, model } from "mongoose";

const pendingUserSchema = Schema({
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
  resetToken: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
  },
});

export default models.pendingUser || model("pendingUser", pendingUserSchema);
