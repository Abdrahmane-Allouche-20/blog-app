import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    ClerkId: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      required: true, // Fixed "require"
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Correct way to define the model
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
