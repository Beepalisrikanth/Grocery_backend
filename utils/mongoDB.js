import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connect = async()=>{
    try{
        await mongoose.connect(process.env.MONGOURL);
        console.log("mongoDB connected successfully")
    }
    catch(e){
        console.log(e)
    }
}

export default connect


