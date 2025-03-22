const mongoose = require("mongoose");

const paymentProcessingSchema = new mongoose.Schema({
    payment_id: {
        type: String,
        required: true,
        unique: true
    },
    reference_id: {
        type: String,
        required: true
    },
    payment_date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payment_mode: {
        type: String,
        required: true,
        trim: true
    },
    payment_type: {
        type: String,
        required: true,
        trim: true
    },
    account_id: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "Completed", "Failed", "Cancelled"],
        default: "Pending"
    },
    remarks: {
        type: String,
        trim: true
    },
    created_by: {
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
});

const PaymentProcessing = mongoose.model("PaymentProcessing", paymentProcessingSchema);

module.exports = { PaymentProcessing };