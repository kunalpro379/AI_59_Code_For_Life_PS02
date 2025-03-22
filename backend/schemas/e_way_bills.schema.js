const mongoose = require('mongoose');
const zod = require('zod');

const eWayBillSchema = new mongoose.Schema({
    eway_bill_id: { type: String, required: true, unique: true },
    bill_date: { type: Date, required: true },
    bill_number: { type: String, required: true },
    invoice_id: { type: String, required: true },
    from_gstin: { type: String, required: true },
    to_gstin: { type: String, required: true },
    transport_mode: { type: String, required: true },
    vehicle_number: { type: String, required: true },
    distance_km: { type: Number, required: true },
    value: { type: Number, required: true },
    status: { type: String, required: true },
    created_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const eWayBillValidationSchema = zod.object({
    bill_date: zod.string().transform(str => new Date(str)),
    bill_number: zod.string(),
    invoice_id: zod.string(),
    from_gstin: zod.string(),
    to_gstin: zod.string(),
    transport_mode: zod.string(),
    vehicle_number: zod.string(),
    distance_km: zod.number(),
    value: zod.number(),
    status: zod.enum(['Active', 'Cancelled', 'Expired']),
    created_by: zod.string()
});

const EWayBill = mongoose.model('EWayBill', eWayBillSchema);

module.exports = {
    EWayBill,
    eWayBillValidationSchema
};