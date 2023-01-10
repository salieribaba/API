import express from "express";
import { requireSignin, isAdmin } from "../middlewares/auth.js";
import {
  list,
  read,
  create,
  photo,
  remove,
  update,
  filteredProducts,
  productsCount,
  listProducts,
  productsSearch,
  relatedProducts,
  createOrder,
  orderStatus,
} from "../controllers/product.js";
import formidable from "express-formidable";
const router = express.Router();

router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", list);
router.get("/product/:slug", read);
router.get("/product/photo/:productId", photo);
router.delete("/product/:productId", requireSignin, isAdmin, remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productsSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);
router.post("/order", requireSignin, createOrder);
router.put("/order-status/:orderId", requireSignin, isAdmin, orderStatus);

export default router;
