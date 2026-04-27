import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

// Example route: GET /api/student/test (public)
router.get("/test", (req, res) => {
  res.json({ message: "Student route is working!" });
});

// Student profile (protected)
router.get("/profile", auth(["student"]), (req, res) => {
  res.json({ message: "Student profile accessed", user: req.user });
});

// Protected booking route: only for registered/logged-in students (not anonymous)
router.post("/book", auth(["student"]), (req, res) => {
  // Booking logic here
  res.json({ message: "Booking successful (only for registered students)" });
});

// Example: chatbot route (accessible to anonymous and students)
router.post("/chatbot", auth(["student", "anonymous"]), (req, res) => {
  res.json({ message: "Chatbot accessed" });
});

export default router;
