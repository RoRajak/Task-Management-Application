import mongoose from "mongoose";
import { DB_NAME } from "../constant";

const connectedDB=async()=>{
    try {
        const connectedInsatance= await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: ${connectedInsatance.connection.host}`);
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1)
    }
}

export default connectedDB