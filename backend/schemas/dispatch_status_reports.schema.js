const mongoose = require("mongoose");

const dispatchStatusReportSchema = new mongoose.Schema({
    report_id: {
        type: String,
        required: true,
        unique: true
    },
    drn_id: {
        type: String,
        required: true
    },
    report_date: {
        type: Date,
        required: true
    },
    current_location: {
        type: String,
        required: true,
        trim: true
    },
    current_status: {
        type: String,
        required: true,
        enum: ["In Transit", "Delivered", "At Hub", "Out for Delivery"],
        default: "In Transit"
    },
    estimated_delivery_date: {
        type: Date,
        required: true
    },
    delay_reason: {
        type: String,
        trim: true
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

const DispatchStatusReport = mongoose.model("DispatchStatusReport", dispatchStatusReportSchema);

module.exports = { DispatchStatusReport };