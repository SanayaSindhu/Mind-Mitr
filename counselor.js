import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

// Example route: GET /api/counselor/test
router.get("/test", (req, res) => {
  res.json({ message: "Counselor route is working!" });
});

// Counselor profile (protected)
router.get("/profile", auth(["counselor"]), (req, res) => {
  res.json({ message: "Counselor profile accessed", user: req.user });
});

export default router;
