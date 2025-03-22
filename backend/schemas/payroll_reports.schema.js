const mongoose = require("mongoose");

const payrollReportSchema = new mongoose.Schema({
    report_id: {
        type: String,
        required: true,
        unique: true
    },
    report_type: {
        type: String,
        required: true,
        trim: true
    },
    report_period: {
        type: String,
        required: true
    },
    total_employees: {
        type: Number,
        required: true
    },
    total_salary: {
        type: Number,
        required: true
    },
    total_deductions: {
        type: Number,
        required: true
    },
    net_payment: {
        type: Number,
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

const PayrollReport = mongoose.model("PayrollReport", payrollReportSchema);

module.exports = { PayrollReport };