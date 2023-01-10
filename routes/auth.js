import express from "express";
import {
  register,
  login,
  secret,
  updateProfile,
  getOrders,
  allOrders,
} from "../controllers/auth.js";
import { requireSignin, isAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/auth-check", requireSignin, (req, res) => {
  res.json({ ok: true });
});
router.put("/profile", requireSignin, updateProfile);

router.get("/admin-check", requireSignin, isAdmin, (req, res) => {
  res.json({ ok: true });
});

//test
router.get("/secret", requireSignin, isAdmin, secret);

router.get("/orders", requireSignin, getOrders);
router.get("/all-orders", requireSignin, isAdmin, allOrders);

export default router;
