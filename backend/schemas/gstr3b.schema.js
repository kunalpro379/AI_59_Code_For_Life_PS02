const mongoose = require("mongoose");

const gstr3bSchema = new mongoose.Schema({
    return_id: {
        type: String,
        required: true,
        unique: true
    },
    return_period: {
        type: String,
        required: true
    },
    filing_date: {
        type: Date,
        required: true
    },
    outward_supplies: {
        type: Number,
        required: true
    },
    inward_supplies: {
        type: Number,
        required: true
    },
    input_tax_credit: {
        type: Number,
        required: true
    },
    output_tax: {
        type: Number,
        required: true
    },
    net_tax: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Draft", "Submitted", "Filed"],
        default: "Draft"
    },
    filing_status: {
        type: String,
        required: true,
        enum: ["On Time", "Late"],
        default: "On Time"
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

const GSTR3B = mongoose.model("GSTR3B", gstr3bSchema);

module.exports = { GSTR3B };