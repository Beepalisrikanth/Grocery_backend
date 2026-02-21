import {addToCart,viewCart,updateQunatity,deleteItem} from "../controllers/cartControllers.js"
import {verifyEamilToken} from "../middleware/emailMiddleware.js"
import express from "express"
const router = express.Router()

router.route("/addToCart").post(verifyEamilToken,addToCart)
router.route("/viewcart").get(verifyEamilToken,viewCart)
router.route("/quantityUpdate").put(verifyEamilToken,updateQunatity)
router.route("/deleteItem").delete(verifyEamilToken,deleteItem)
export default router