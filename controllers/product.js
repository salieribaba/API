import Product from '../models/product.js';
import Category from '../models/category.js';
import fs from 'fs';
import slugify from 'slugify';


//ürünleri category ile birlikte listele
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('category').select('-photo').limit(10).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

//ürünü category ile birlikte listele
export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category').select('-photo');
        res.json(product);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

//ürünü category ile birlikte oluştur
export const create = async (req, res) => {
    try {
       const { name, description, price, category,  quantity, shipping } = req.fields;
        const { photo } = req.files;
        
        switch (true) { 
            case !name.trim():
                return res.status(400).json({ error: 'Ürün adı boş bırakılamaz' });
            case !price.trim():
                return res.status(400).json({ error: 'Ürün fiyatı boş bırakılamaz' });
            case !category.trim():
                return res.status(400).json({ error: 'Ürün kategorisi boş bırakılamaz' });
            case !quantity.trim():
                return res.status(400).json({ error: 'Ürün adedi boş bırakılamaz' });
            case !shipping.trim():
                return res.status(400).json({ error: 'Ürün kargo bilgisi boş bırakılamaz' });
            case photo && photo.size > 1000000:
                return res.status(400).json({ error: 'Resim boyutu 1 Mb. tan büyük olamaz!' });
            default:
                break;
        }

       const product = new Product({ ...req.fields, slug: slugify(name) });
       if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
      await product.save();
        res.json(product);

    
   } catch (error) {
        console.error(error.message);
        res.status(400).send('Hatalı istek');
       res.status(500).send('Server Error');
   }
};

//ürün resmini göster
export const photo = async (req, res) => {
    try {
        const product = await Product.findById(req.params.productId).select('photo');
        if (product.photo.data) {
            res.set('Content-Type', product.photo.contentType);
            return res.send(product.photo.data);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Fotoğraf bulunamadı.');
        res.status(500).send('Server Error');
    }
};
 
//ürünü sil
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.productId);
        res.json({ message: 'Ürün silindi' });
    } catch (error) {
        console.error(error.message);
        res.status(400).send('Hatalı istek');
        res.status(500).send('Server Error');
    }
};
 
//ürünü güncelle
export const update = async (req, res) => {
    try {
        const { name, description, price, category,  quantity, shipping } = req.fields;
        const { photo } = req.files;
        
        switch (true) { 
            case !name.trim():
                return res.status(400).json({ error: 'Ürün adı boş bırakılamaz' });
            case !price.trim():
                return res.status(400).json({ error: 'Ürün fiyatı boş bırakılamaz' });
            case !category.trim():
                return res.status(400).json({ error: 'Ürün kategorisi boş bırakılamaz' });
            case !quantity.trim():
                return res.status(400).json({ error: 'Ürün adedi boş bırakılamaz' });
            case !shipping.trim():
                return res.status(400).json({ error: 'Ürün kargo bilgisi boş bırakılamaz' });   
            case photo && photo.size > 1000000:
                return res.status(400).json({ error: 'Resim boyutu 1 Mb. tan büyük olamaz!' });
            default:
                break;
        }

        let product = await Product.findByIdAndUpdate(req.params.productId);
        if (!product) return res.status(400).json({ error: 'Ürün bulunamadı' });
        product
            .set({ ...req.fields, slug: slugify(name) })
            .set({ updatedAt: Date.now() });
        if (photo) {
            product.photo.data = fs.readFileSync(photo.path);
            product.photo.contentType = photo.type;
        }
        await product.save();
        res.json(product);

    }
    catch (error) {
        console.error(error.message);
        res.status(400).send('Hatalı istek');
        res.status(500).send('Server Error');
    }
};


