const mongoose = require("mongoose");

const batchCardSchema = new mongoose.Schema({
    batch_id: {
        type: String,
        required: true,
        unique: true
    },
    product_code: {
        type: String,
        required: true
    },
    batch_number: {
        type: String,
        required: true
    },
    start_date: {
        type: Date,
        required: true
    },
    planned_end_date: {
        type: Date,
        required: true
    },
    actual_end_date: {
        type: Date,
        required: true
    },
    planned_quantity: {
        type: Number,
        required: true
    },
    actual_quantity: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["In Progress", "Completed", "Cancelled"],
        default: "In Progress"
    },
    quality_status: {
        type: String,
        required: true,
        enum: ["Pending", "Passed", "Failed"],
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

const BatchCard = mongoose.model("BatchCard", batchCardSchema);

module.exports = { BatchCard };