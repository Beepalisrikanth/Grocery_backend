import mongoose from "mongoose";

const categoryEnum = [
    "vegetables","fruits","food-grains"
] 

const unitsEnum = [
    "500g","1kg", "2kg", "5kg", "10kg"
]

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    desc:{
        type:String,
        required:true
    },
    category:{
        type:String,
        enum:categoryEnum
    },
    price:{
        type:String
    },
    unit:{
        type:String,
        enum:unitsEnum
    },
    image:{
        type:String
    },
    isActive:{
        type:Boolean
    }
},
{timestamps:true}
)

const product = mongoose.model("product",productSchema);
export default product