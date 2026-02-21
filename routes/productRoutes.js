import express from "express"
import { createProduct, getProduct,getProductByCategory, getProductByName} from "../controllers/productControllers.js";
import upload from "../middleware/cloudinaryMiddleware.js";
// import {adminMiddleware} from "../middleware/authMiddleware.js"


const router = express.Router()

router.route("/add-Product").post(upload.single("image"), createProduct)

router.route("/show-Product").get(getProduct)

router.route("/getProductByCategory").post(getProductByCategory)

router.route("/getProductByName").post(getProductByName)

export default router;