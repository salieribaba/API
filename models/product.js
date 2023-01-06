import mongoose from "mongoose";
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    slug: {
        type: String,
        lowercase: true,
    },
    description: {
        type: String,
        maxlength: 2000
    },
    price: {
        type: Number,
        trim: true,
        required: true,
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    quantity: Number,
    sold: {
        type: Number,
        default: 0
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    shipping: {
        type: Boolean,
        required: false
    }
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
