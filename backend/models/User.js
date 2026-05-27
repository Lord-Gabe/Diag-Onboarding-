import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firebaseUID: String,
    name: String,
    email: String,
    photo: String,
    role: String,
    workspace: String,
    wsUrl: String,
    wsSize: String,
    emails: [String],
    goals: [String],

    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "User",
  userSchema
);