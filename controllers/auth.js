import User from "../models/user.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

export const register = async (req, res) => {
  try {
    const { name, email, password, address } = req.body;
    // validation
    if (!name.trim()) return res.status(400).send("İsim gereklidir!");
    if (!password || password.length < 6)
      return res.status(400).send("Şifre en az 6 karakter olmalıdır!");
    if (!email) return res.status(400).send("Email gereklidir!");

    const existingUser = await User.findOne({ email }).exec();
    if (existingUser) return res.status(400).send("Email zaten kullanımda!");

    const hashedPassword = await hashPassword(password);
    const user = await new User({
      name,
      email,
      address,
      password: hashedPassword,
    }).save();

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    console.log("Kullanıcı kayıt edildi", user);
    return res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log("Kullanıcı kayıt edilemedi", error);
  }
};

export const login = async (req, res) => {
  try {
    // 1. destructure name, email, password from req.body
    const { email, password } = req.body;
    // 2. all fields require validation
    if (!email) {
      return res.json({ error: "Email is taken" });
    }
    if (!password || password.length < 6) {
      return res.json({ error: "Password must be at least 6 characters long" });
    }
    // 3. check if email is taken
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not found" });
    }
    // 4. compare password
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({ error: "Wrong password" });
    }
    // 5. create signed jwt
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // 7. send response
    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        address: user.address,
      },
      token,
    });
  } catch (err) {
    console.log(err);
  }
};

export const secret = async (req, res) => {
  res.json({ currentUser: req.user });
};
