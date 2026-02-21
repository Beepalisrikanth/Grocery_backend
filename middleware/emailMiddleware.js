import jwt from "jsonwebtoken"
import dotenv from "dotenv"


dotenv.config()

export const verifyEamilToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "token required / token incorrect / token expired",
                success:false
            })
        }

        const decoded = jwt.verify(token,process.env.SECERT_KEY)
        req.userId = decoded._id,
        req.userEmail = decoded.email,
        next()
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            message: "server error",
            success: false
        })
    }
}
