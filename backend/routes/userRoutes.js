import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GOOGLE LOGIN
router.post("/google-login", async (req, res) => {
  try {
    const {
      firebaseUID,
      name,
      email,
      photo,
    } = req.body;

    let user = await User.findOne({ firebaseUID });
    if (!user) {
      user = await User.create({
        firebaseUID,
        name,
        email,
        photo,
        onboardingCompleted: false,
      });
    }

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// GET USER
router.get("/:firebaseUID", async (req, res) => {
  try {
    const user = await User.findOne({
      firebaseUID: req.params.firebaseUID,
    });

    res.json({
      success: true,
      user,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// COMPLETE ONBOARDING
router.post("/complete-onboarding", async (req, res) => {
  try {
    const {
      firebaseUID,
      name,
      email,
      password,
      role,
      workspace,
      wsUrl,
      wsSize,
      emails,
      goals,
    } = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { firebaseUID },
      {
        name,
        email,
        password,
        role,
        workspace,
        wsUrl,
        wsSize,
        emails,
        goals,
        onboardingCompleted: true,
      },
      { new: true }
    );

    res.json({
      success: true,
      user: updatedUser,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// LATEST SIGNUPS
router.get("/latest-signups/all", async (req, res) => {
  try {
    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(10);
    res.json(users);

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

export default router;