import {sendOtp, verifyOtp} from "../controllers/emailControllers.js"

import express from "express"

const routes = express.Router()

routes.route("/sendotp").post(sendOtp)
routes.route("/verifyOtp").post(verifyOtp)

export default routes