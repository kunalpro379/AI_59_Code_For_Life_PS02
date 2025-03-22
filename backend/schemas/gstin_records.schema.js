const mongoose = require("mongoose");

const gstinRecordSchema = new mongoose.Schema({
    record_id: {
        type: String,
        required: true,
        unique: true,
    },
    gstin: {
        type: String,
        required: true,
        match: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
    },
    legal_name: {
        type: String,
        required: true,
    },
    trade_name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    state_code: {
        type: String,
        required: true,
        match: /^[0-9]{2}$/,
    },
    registration_type: {
        type: String,
        required: true,
        enum: ["Regular", "Composition", "Unregistered", "Input Service Distributor"],
    },
    registration_date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive", "Suspended", "Cancelled"],
    },
    remarks: {
        type: String,
    },
    created_by: {
        type: String,
        required: true,
    },
    created_date: {
        type: Date,
        required: true,
    },
    last_updated: {
        type: Date,
        required: true,
    },
});

const GSTINRecord = mongoose.model("GSTINRecord", gstinRecordSchema);

module.exports = { GSTINRecord };