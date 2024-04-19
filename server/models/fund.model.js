import mongoose from 'mongoose';

const FundSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
     
      amount: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
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

const Fund = mongoose.model('Funds', FundSchema);

export default Fund