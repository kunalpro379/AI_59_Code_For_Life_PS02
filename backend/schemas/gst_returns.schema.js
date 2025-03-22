const mongoose = require("mongoose");

const gstReturnSchema = new mongoose.Schema({
    return_id: {
        type: String,
        required: true,
        unique: true
    },
    return_type: {
        type: String,
        required: true,
        enum: ["GSTR-1", "GSTR-2A", "GSTR-3B", "GSTR-9"]
    },
    filing_period: {
        type: String,
        required: true
    },
    due_date: {
        type: Date,
        required: true
    },
    filing_date: {
        type: Date,
        required: true
    },
    total_tax_liability: {
        type: Number,
        required: true
    },
    total_input_tax: {
        type: Number,
        required: true
    },
    tax_payable: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Draft", "Pending", "Filed", "Error"]
    },
    remarks: {
        type: String
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

const GSTReturn = mongoose.model("GSTReturn", gstReturnSchema);

module.exports = { GSTReturn };