import express from 'express';
import { requireSignin, isAdmin } from '../middlewares/auth.js';
import { getProducts, getProductById, create, photo, remove, update } from '../controllers/product.js';
import formidable from 'express-formidable';
const router = express.Router();


router.get('/products', getProducts);
router.get('/product/:id', getProductById);
router.post('/product', requireSignin, isAdmin, formidable(), create);
router.get('/product/photo/:productId', photo);
router.delete('/product/:productId', requireSignin, isAdmin, remove);
router.put('/product/:productId', requireSignin, isAdmin, formidable(), update);






export default router;