import mongoose,{Schema} from "mongoose";
import { string } from "zod";

interface ITodo{
    title:string
    description?:string
    status:string,
    priority?:string,
    deadline?:string
    user:mongoose.Schema.Types.ObjectId;

}

const noteSchema= new Schema<ITodo>(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
        },
        status:{
            type:String,
            required:true
        },
        priority:{
            type:String
        },
        deadline:{
            type:String
        },
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    },
    {
        timestamps:true,
    }
)

export  const Todo=mongoose.model<ITodo>("Todo",noteSchema)