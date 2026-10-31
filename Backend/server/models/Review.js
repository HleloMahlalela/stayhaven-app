import mongoose from 'mongoose';
const reviewSchema = new mongoose.Schema({
        listing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing',
            required: true 
        },
        guest: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5
        },
        comment: {
            type: String,
            required: true,
            trim: true
       },
       isANonymous: {
            type: Boolean,
            default: false
       }
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Review', reviewSchema);
