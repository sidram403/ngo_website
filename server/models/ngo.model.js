import mongoose from 'mongoose';

const ngoSchema = new mongoose.Schema({
    organizationName:{
        type:String,
        required:true,
        unique:true
    },
    organizationNumber:{
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
    mission:{
        type:String,
        required:true,
        
    },
    role:{
        type:String,
        required:true
    }

}, {timestamps: true})

const Ngo = mongoose.model('Ngo', ngoSchema);

export default Ngo