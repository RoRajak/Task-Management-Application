import mongoose from "mongoose";
interface IUser{
    name:string
    email:string
    password:string

}


const userSchema= new mongoose.Schema<IUser>(
    {
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true,
        }


    },
    {timestamps:true}
)

export const User=mongoose.model<IUser>("User",userSchema)