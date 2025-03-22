const mongoose = require("mongoose");

const gstReconciliationSchema = new mongoose.Schema({
    reconciliation_id: {
        type: String,
        required: true,
        unique: true
    },
    period: {
        type: String,
        required: true
    },
    gstr1_total: {
        type: Number,
        required: true
    },
    gstr2a_total: {
        type: Number,
        required: true
    },
    gstr3b_total: {
        type: Number,
        required: true
    },
    discrepancy_amount: {
        type: Number,
        required: true
    },
    reconciliation_status: {
        type: String,
        required: true,
        enum: ["Pending", "In Progress", "Completed", "Discrepancy Found"]
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

const GSTReconciliation = mongoose.model("GSTReconciliation", gstReconciliationSchema);

module.exports = { GSTReconciliation };