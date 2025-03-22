const mongoose = require("mongoose");

const eInvoiceSchema = new mongoose.Schema({
    invoice_id: {
        type: String,
        required: true,
        unique: true
    },
    invoice_date: {
        type: Date,
        required: true
    },
    invoice_number: {
        type: String,
        required: true,
        unique: true
    },
    customer_gstin: {
        type: String,
        required: true,
        trim: true
    },
    hsn_code: {
        type: String,
        required: true,
        trim: true
    },
    taxable_amount: {
        type: Number,
        required: true
    },
    cgst_amount: {
        type: Number,
        required: true
    },
    sgst_amount: {
        type: Number,
        required: true
    },
    igst_amount: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    irn: {
        type: String,
        required: true,
        unique: true
    },
    qr_code: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Draft", "Generated", "Cancelled", "Amended"],
        default: "Draft"
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

const EInvoice = mongoose.model("EInvoice", eInvoiceSchema);

module.exports = { EInvoice };