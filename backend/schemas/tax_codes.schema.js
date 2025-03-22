const mongoose = require("mongoose");

const taxCodeSchema = new mongoose.Schema({
    code_id: {
        type: String,
        required: true,
        unique: true
    },
    tax_code: {
        type: String,
        required: true,
        unique: true
    },
    tax_name: {
        type: String,
        required: true,
        trim: true
    },
    rate: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
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

const TaxCode = mongoose.model("TaxCode", taxCodeSchema);

module.exports = { TaxCode };