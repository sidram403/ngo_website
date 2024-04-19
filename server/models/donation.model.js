import mongoose from 'mongoose';

const DonationSchema = new mongoose.Schema({
    item: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
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

const Donation = mongoose.model('Donation', DonationSchema);

export default Donation