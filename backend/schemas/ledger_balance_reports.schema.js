const mongoose = require('mongoose');
const zod = require('zod');

const ledgerBalanceReportSchema = new mongoose.Schema({
    report_id: { type: String, required: true, unique: true },
    account_id: { type: String, required: true },
    report_date: { type: Date, required: true },
    opening_balance: { type: Number, required: true },
    debit_total: { type: Number, required: true },
    credit_total: { type: Number, required: true },
    closing_balance: { type: Number, required: true },
    created_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const ledgerBalanceReportValidationSchema = zod.object({
    account_id: zod.string(),
    report_date: zod.string().transform(str => new Date(str)),
    opening_balance: zod.number(),
    debit_total: zod.number(),
    credit_total: zod.number(),
    closing_balance: zod.number(),
    created_by: zod.string()
});

const LedgerBalanceReport = mongoose.model('LedgerBalanceReport', ledgerBalanceReportSchema);

module.exports = {
    LedgerBalanceReport,
    ledgerBalanceReportValidationSchema
};