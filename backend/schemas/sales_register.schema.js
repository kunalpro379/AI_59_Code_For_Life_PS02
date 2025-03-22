const mongoose = require('mongoose');
const zod = require('zod');

const salesRegisterSchema = new mongoose.Schema({
    sale_id: { type: String, required: true, unique: true },
    order_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    sale_date: { type: Date, required: true },
    product_code: { type: String, required: true },
    quantity: { type: Number, required: true },
    unit_price: { type: Number, required: true },
    total_amount: { type: Number, required: true },
    tax_amount: { type: Number, required: true },
    shipping_amount: { type: Number, required: true },
    grand_total: { type: Number, required: true },
    payment_status: { type: String, required: true },
    payment_terms: { type: String, required: true },
    created_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const salesRegisterValidationSchema = zod.object({
    order_id: zod.string(),
    customer_id: zod.string(),
    sale_date: zod.string().transform(str => new Date(str)),
    product_code: zod.string(),
    quantity: zod.number(),
    unit_price: zod.number(),
    total_amount: zod.number(),
    tax_amount: zod.number(),
    shipping_amount: zod.number(),
    grand_total: zod.number(),
    payment_status: zod.enum(['Pending', 'Completed', 'Failed']),
    payment_terms: zod.string(),
    created_by: zod.string()
});

const SalesRegister = mongoose.model('SalesRegister', salesRegisterSchema);

module.exports = {
    SalesRegister,
    salesRegisterValidationSchema
};