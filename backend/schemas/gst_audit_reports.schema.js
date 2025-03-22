const mongoose = require("mongoose");

const gstAuditReportSchema = new mongoose.Schema({
    report_id: {
        type: String,
        required: true,
        unique: true
    },
    report_type: {
        type: String,
        required: true,
        enum: ["GSTR-9", "GSTR-9C"]
    },
    financial_year: {
        type: String,
        required: true
    },
    generation_date: {
        type: Date,
        required: true
    },
    total_turnover: {
        type: Number,
        required: true
    },
    total_tax_paid: {
        type: Number,
        required: true
    },
    total_input_tax_credit: {
        type: Number,
        required: true
    },
    audit_status: {
        type: String,
        required: true,
        enum: ["Draft", "Filed", "Final"]
    },
    auditor_name: {
        type: String,
        required: true
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

const GSTAuditReport = mongoose.model("GSTAuditReport", gstAuditReportSchema);

module.exports = { GSTAuditReport };