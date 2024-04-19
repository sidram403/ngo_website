import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
    service: {
        type: String,
        required: true,
      },
     
      date: {
        type: Date,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      selectedNGO: {
        type: String,
        required: true,
      },
      user: {
        type: String,
        ref: 'User',
       
        required: true,
      },

}, {timestamps: true})

const Service = mongoose.model('Service', ServiceSchema);

export default Service