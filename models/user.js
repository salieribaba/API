import mongoose from "mongoose";
const { Schema } = mongoose;


const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        min: 3,
        max: 255
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 64
    },
    address: {
        type: String,
        trim: true,
    },
    role: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

export default mongoose.model("User", userSchema);