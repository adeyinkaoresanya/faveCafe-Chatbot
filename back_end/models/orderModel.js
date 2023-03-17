const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        sessionID: {
            type: String,
        },  

        placedOrder: [
            {
                number: Number,
                food: String,
                price: Number
            }
        ],

        currentOrder: [
            {
                number: Number,
                food: String,
                price: Number
            }
        ]
    },

    { timestamps: true }
);

module.exports = mongoose.model('orders', orderSchema);