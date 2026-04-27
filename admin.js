import express from "express";
import auth from "../middleware/auth.js";

const router = express.Router();

// Example route: GET /api/admin/test
router.get("/test", (req, res) => {
  res.json({ message: "Admin route is working!" });
});

// Admin profile (protected)
router.get("/profile", auth(["admin"]), (req, res) => {
  res.json({ message: "Admin profile accessed", user: req.user });
});

export default router;
