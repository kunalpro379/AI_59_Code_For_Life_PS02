const mongoose = require("mongoose");

const gstr2aSchema = new mongoose.Schema({
    return_id: {
        type: String,
        required: true,
        unique: true
    },
    return_period: {
        type: String,
        required: true
    },
    generation_date: {
        type: Date,
        required: true
    },
    total_invoices: {
        type: Number,
        required: true
    },
    total_taxable_value: {
        type: Number,
        required: true
    },
    total_cgst: {
        type: Number,
        required: true
    },
    total_sgst: {
        type: Number,
        required: true
    },
    total_igst: {
        type: Number,
        required: true
    },
    total_cess: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Reconciled", "Pending", "In Progress"],
        default: "Pending"
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

const GSTR2A = mongoose.model("GSTR2A", gstr2aSchema);

module.exports = { GSTR2A };