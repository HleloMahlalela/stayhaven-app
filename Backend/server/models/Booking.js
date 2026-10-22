const mongoose = require('mongoose');
const bookingSchema = new mongoose.Schema({
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
        checkInDate: {
            type: Date,
            required: true
        },
        checkOutDate: {
            type: Date,
            required: true
        },
        totalPrice:{
            type: Number,
            required: true,
            min: 0
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
);