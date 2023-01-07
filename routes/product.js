import express from "express";
import { requireSignin, isAdmin } from "../middlewares/auth.js";
import {
  list,
  read,
  create,
  photo,
  remove,
  update,
} from "../controllers/product.js";
import formidable from "express-formidable";
const router = express.Router();

router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);

export default router;
