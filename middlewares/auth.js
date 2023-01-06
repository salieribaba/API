import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const requireSignin = (req, res, next) => { 
    try {
        const decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = decoded;
         next();
    
   } catch (error) {
       return res.status(401).send("Giriş yapmalısınız!");
    
   }
};

export const isAdmin =async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).exec();
        if (user.role !== 1) {
            return res.status(403).send("Yönetici yetkiniz yok!");
        }
        next();
        
    } catch (error) {
        console.log(error);
        
    }
 };