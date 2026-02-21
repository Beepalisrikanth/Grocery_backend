import admin from "../models/adminModel.js"

import dotenv from "dotenv"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

dotenv.config();

export const adminRegister = async(req,res)=>{
    try{
        const {name, email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({
                message:"you missed some required fields",
                success:false
            })
        }

        const adminRecord = await admin.findOne({email})
        if(adminRecord){
            return res.status(409).json({
                message:"conflit occurs email alredy exists",
                success:false
            })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        
        const newAdmin = await admin.create({
            name,
            email,
            password:hashedPassword
        })

        return res.status(201).json({
            message:"new admin registered successfully",
            newAdmin,
            success:true
        })
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            message:`server error ${error}`,
            success:false
        })
    }
}


export const adminLogin = async(req,res)=>{
    try{
        const {email,password} = req.body;

        if(!email || !password){
            console.log("required field are missing");
            return res.status(400).json({
                message:"something important required fields are missing",
                success:false
            })    
        }

        const adminRecord = await admin.findOne({email})
        if(!adminRecord){
            return res.status(401).json({
                message:"unauthorized user / email id not found",
                success:false
            }) 
        }

        const adminpassword = await bcrypt.compare(password,adminRecord.password)
        if(!adminpassword){
             return res.status(401).json({
                message:"unauthorized user / password is incorrext",
                success:false
            }) 
        }

        const token = jwt.sign({adminId:adminRecord._id},process.env.SECERT_KEY,{expiresIn:'1d'})

        return res.status(200).json({
            message:"admin login successfully",
            token,
            success:true
        })
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message:`server error ${error}`,
            success:false
        })
    }
}