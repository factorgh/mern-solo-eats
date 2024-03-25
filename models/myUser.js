import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    auth0Id:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
    },
    name:String,
    city: String,
    addressLine1: String,
    country: String,
})

const User = mongoose.model("User", userSchema)
export default User;