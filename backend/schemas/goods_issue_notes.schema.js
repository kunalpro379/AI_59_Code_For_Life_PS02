const mongoose = require("mongoose");

const goodsIssueNotesSchema = new mongoose.Schema({
    gin_id: {
        type: String,
        required: true,
        unique: true
    },
    issue_date: {
        type: Date,
        required: true
    },
    requisition_number: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    purpose: {
        type: String,
        required: true,
        enum: ["Production", "Testing", "Maintenance", "Research", "Other"]
    },
    total_quantity: {
        type: Number,
        required: true,
        min: 0
    },
    total_value: {
        type: Number,
        required: true,
        min: 0
    },
    status: {
        type: String,
        required: true,
        enum: ["Draft", "Pending", "Approved", "Rejected", "Cancelled"]
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

const GoodsIssueNotes = mongoose.model("GoodsIssueNotes", goodsIssueNotesSchema);

module.exports = { GoodsIssueNotes };