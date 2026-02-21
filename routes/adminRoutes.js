import express from "express"
import { adminLogin, adminRegister } from "../controllers/adminControllers.js";



const router = express.Router()

router.route("/newAdminRegister").post(adminRegister)

router.route("/adminLogin").post(adminLogin)

export default router