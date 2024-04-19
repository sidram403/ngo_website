import mongoose from 'mongoose';

const FundRaiseSchema = new mongoose.Schema({
    fundname: {
        type: String,
        required: true,
      },
     
      amount: {
        type: String,
        required: true,
      },
      fundreason: {
        type: String,
        required: true,
      },
      ngo: {
        type: String,
        ref:'Ngo',
        required: true,
      },
      

}, {timestamps: true})

const FundRaise = mongoose.model('FundRaise', FundRaiseSchema);

export default FundRaise