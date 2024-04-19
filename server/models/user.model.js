import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
        unique:true
    },
   
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        
    },
    phone:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true,
        
    },
    skills:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        required:true
    }

}, {timestamps: true})

const User = mongoose.model('User', userSchema);

export default User