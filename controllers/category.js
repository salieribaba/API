import Category from '../models/category.js';
import slugify from 'slugify';

export const create = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name.trim()) {
            return res.status(400).send('Kategori adı gerekli.');
        }
        const existingCategory = await Category.findOne({ name });
        if (existingCategory) {
            return res.status(400).send('Kategori adı mevcut.');
        }
        const category = await new Category({ name, slug: slugify(name) }).save();
        res.json(category);
    } catch (err) {
        res.status(400).send('Kategori oluşturulamadı.');
    }
    
};

export const read = async (req, res) => { 
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
};

export const update = async (req, res) => {
    const { name } = req.body;
    const {categoryId}=req.params;
    try {
        const updated = await Category.findByIdAndUpdate(categoryId, {
            name,
            slug: slugify(name),
        }, { new: true })

        res.json(updated);
    } catch (err) {
        res.status(400).send('Kategori güncellenemedi.');
    }
};
 
export const remove = async (req, res) => {
    try {
        const deleted = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(deleted);
    } catch (err) {
        res.status(400).send('Kategori silinemedi.');
    }
};

export const list = async (req, res) => {
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
};









