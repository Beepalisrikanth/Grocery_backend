import mongoose from "mongoose"

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
        unique:true
    },
    items:[{
        product:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:"product"
        },
        quantity:{
            type:Number,
            required:true,
            min:1
        }
    }]
    
},{
    timestamps:true
})

const cart = mongoose.model("cart",cartSchema)

export default cart