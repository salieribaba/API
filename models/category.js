import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        maxlength: 32
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        index: true
    }
}, { timestamps: true });

export default mongoose.model("Category", categorySchema);