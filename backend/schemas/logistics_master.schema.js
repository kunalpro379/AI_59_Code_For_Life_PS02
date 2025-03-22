const mongoose = require("mongoose");

const logisticsMasterSchema = new mongoose.Schema({
    partner_id: {
        type: String,
        required: true,
        unique: true
    },
    partner_name: {
        type: String,
        required: true,
        trim: true
    },
    transport_mode: {
        type: String,
        required: true,
        trim: true
    },
    contact_person: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    service_area: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive", "Suspended"],
        default: "Active"
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

const LogisticsMaster = mongoose.model("LogisticsMaster", logisticsMasterSchema);

module.exports = { LogisticsMaster };