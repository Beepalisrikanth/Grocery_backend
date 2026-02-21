import express from "express";
import dotenv from "dotenv";
// import path from "path"

import mongo from "./utils/mongoDB.js"

import productRoutes from "./routes/productRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import emailRoutes from "./routes/emailRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"

// import { fileURLToPath } from "url";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
dotenv.config()

app.use(express.json());
app.use(express.urlencoded({extended:true}))

const PORT = process.env.PORT

app.use("/product",productRoutes)
app.use("/admin",adminRoutes)
app.use("/email",emailRoutes)
app.use("/cart",cartRoutes)


console.log(process.env.CLOUDINARY_NAME);
// app.use("/uploads",express.static(path.join(__dirname,"uploads")))

app.listen(PORT,()=>{
    console.log(`server running @${PORT}`)
    mongo()
})