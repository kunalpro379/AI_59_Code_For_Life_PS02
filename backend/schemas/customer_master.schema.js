const mongoose = require('mongoose');
const zod = require('zod');

const customerMasterSchema = new mongoose.Schema({
    customer_id: { type: String, required: true, unique: true },
    customer_name: { type: String, required: true },
    contact_person: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
    gst_number: { type: String, required: true },
    credit_limit: { type: Number, required: true },
    payment_terms: { type: String, required: true },
    status: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const customerMasterValidationSchema = zod.object({
    customer_name: zod.string(),
    contact_person: zod.string(),
    email: zod.string().email(),
    phone: zod.string(),
    address: zod.string(),
    city: zod.string(),
    state: zod.string(),
    country: zod.string(),
    pincode: zod.string(),
    gst_number: zod.string(),
    credit_limit: zod.number(),
    payment_terms: zod.string(),
    status: zod.enum(['Active', 'Inactive', 'Blocked'])
});

const CustomerMaster = mongoose.model('CustomerMaster', customerMasterSchema);

module.exports = {
    CustomerMaster,
    customerMasterValidationSchema
};