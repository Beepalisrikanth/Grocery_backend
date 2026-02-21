import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()

export const adminMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "token required / token incorrect / token expired"
            })
        }


        const decoded = jwt.verify(token, process.env.SECERT_KEY)
        console.log(decoded)
        req.adminId = decoded.adminId
        next()

    }
    catch (error) {
        console.log(`server error ${error}`)
        res.status(403).json({
            message: `you are not a vaild user ${error}`,
            success: false
        })
    }
}