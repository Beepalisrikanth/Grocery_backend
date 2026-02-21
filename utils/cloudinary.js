import express from "express"
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve("./backend/.env") });
import { v2 as cloudinary } from "cloudinary";



cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log(process.env.CLOUDINARY_NAME);
console.log(process.env.CLOUDINARY_API_SECRET);
console.log(process.env.CLOUDINARY_API_KEY);
console.log(process.env.PORT)

export default cloudinary;