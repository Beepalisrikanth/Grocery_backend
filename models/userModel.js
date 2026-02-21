import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    OTP:{
        type:String
    },
    otpExpires:{
        type:Date
    }
},{
    timestamps:true
})

const user = mongoose.model("user",userSchema)

export default user