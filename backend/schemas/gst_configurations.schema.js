const mongoose = require("mongoose");

const gstConfigurationSchema = new mongoose.Schema({
    config_id: {
        type: String,
        required: true,
        unique: true
    },
    gstin: {
        type: String,
        required: true
    },
    business_name: {
        type: String,
        required: true
    },
    business_address: {
        type: String,
        required: true
    },
    state_code: {
        type: String,
        required: true
    },
    tax_payer_type: {
        type: String,
        required: true,
        enum: ["Regular", "Composition", "ISD", "TDS", "TCS"]
    },
    registration_date: {
        type: Date,
        required: true
    },
    default_tax_rate: {
        type: Number,
        required: true
    },
    filing_frequency: {
        type: String,
        required: true,
        enum: ["Monthly", "Quarterly", "Annually"]
    },
    auto_generate_einvoice: {
        type: Boolean,
        default: false
    },
    auto_generate_eway: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive"],
        default: "Active"
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

const GSTConfiguration = mongoose.model("GSTConfiguration", gstConfigurationSchema);

module.exports = { GSTConfiguration };