import mongoose from "mongoose";

const ObjectId = mongoose.Schema.Types.ObjectId;

const orderSchema = new mongoose.Schema(
  {
    products: [{ type: ObjectId, ref: "Product" }],
    buyer: { type: ObjectId, ref: "User" },
    status: {
      type: String,
      default: "bekliyor",
      enum: ["bekliyor", "işleme alındı", "sevk edildi", "iptal edildi"],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
