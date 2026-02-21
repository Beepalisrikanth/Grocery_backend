
import {generateOTP} from "../email/generateOTP.js";
import {sendOtpEmail} from "../email/sendOTP.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import user from "../models/userModel.js";

dotenv.config()

export const sendOtp =async(req,res)=>{
    try{
        const {name, email} = req.body
        if(!email){
            return res.status(400).json({
                message:'email is required',
                success:false
            })
        }

        let User = await user.findOne({email})
        if(!User){
           User = await user.create({name,email})

        }

        const otp = generateOTP()
        User.OTP = otp

        const otpExp = Number(process.env.OTP_EXP) || 5*60*1000

        User.otpExpires= Date.now() + otpExp   // 5 minutes === 3,00,000 ms
        await User.save()

        await sendOtpEmail(email,otp)

        res.status(200).json({
            message:`otp send to your email ${email} ${otp} ${otpExp}`,
            success:true
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).json({
            message:`server error ${error}`,
            success:false
        })

    }
}

export const verifyOtp = async(req,res)=>{
    try{
        const {email,otp} = req.body;

        if(!email || !otp) {
            return res.status(400).json({
                message:"required fileds are missing",
                success:false
            })
        }

        const User = await user.findOne({email})

        if(!User){
            return res.status(404).json({
                message:"user not found",
                success:false
            })
        }

        if(!User.OTP || User.OTP !== otp){
            return res.status(400).json({
                message:"otp is required || otp is invalid"
            })
        }

        if(User.otpExpires < Date.now()){
            return res.status(400).json({
                message:"otp is expire"
            })
        }

        User.OTP = undefined
        User.otpExpires = undefined

        await User.save()

        const token = jwt.sign(
            {_id:User._id,email:User.email},
            process.env.SECERT_KEY,
            {expiresIn:process.env.TOKEN_EXP}
        )
    res.status(200).json({
        message:"user login successfully",
        token
    })
    }
    catch(error){
        console.log("error");
        res.status(500).json({
            message:`server error ${error}`,
            success:false
        })
    }
}