const mongoose = require("mongoose");

const stockTransferSchema = new mongoose.Schema({
    transfer_id: {
        type: String,
        required: true,
        unique: true
    },
    transfer_date: {
        type: Date,
        required: true
    },
    source_zone_id: {
        type: String,
        required: true
    },
    destination_zone_id: {
        type: String,
        required: true
    },
    transfer_type: {
        type: String,
        required: true,
        trim: true
    },
    total_items: {
        type: Number,
        required: true
    },
    total_quantity: {
        type: Number,
        required: true
    },
    total_value: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Pending", "In Transit", "Completed", "Cancelled"],
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

const StockTransfer = mongoose.model("StockTransfer", stockTransferSchema);

module.exports = { StockTransfer };