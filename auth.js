

import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { body, validationResult } from "express-validator";
import User from "../models/User.js";


const router = express.Router();
// ✅ Debug log
console.log("✅ Auth routes loaded");

// JWT Auth Middleware
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ msg: "Token is not valid" });
  }
}

// Protected route for demo
router.get("/protected", authMiddleware, (req, res) => {
  res.json({ msg: "You have accessed a protected route!", user: req.user });
});





// Register User
router.post(
  "/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").optional().isIn(["student", "counselor", "admin"]).withMessage("Invalid role")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, role } = req.body;
    try {
      let user = await User.findOne({ email });
      console.log("Registering user:", email); // ✅ Debug log
      if (user) return res.status(400).json({ msg: "User already exists" });
      const hashedPassword = await bcrypt.hash(password, 10);
      user = new User({ name, email, password: hashedPassword, role });
      await user.save();
      res.json({ msg: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);


// Login User
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: "Invalid credentials" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      res.json({ token, role: user.role });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  }
);

export default router;

// Anonymous Login (for chatbot access only)
router.post("/anonymous-login", (req, res) => {
  try {
    // You can add more info to payload if needed
    const token = jwt.sign(
      { role: "anonymous" },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token, role: "anonymous" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});
