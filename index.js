import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import morgan from "morgan";
import categoryRoute from "./routes/category.js";
import productRoute from "./routes/product.js";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT || 8000;
//mongo db ye async bağlan ve serveri başlat
const start = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Mongo Db'ye başarıyla bağlanıldı...`);
    });
  } catch (err) {
    console.log(err);
  }
};

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//router middleware
app.use("/api", authRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);

start();
