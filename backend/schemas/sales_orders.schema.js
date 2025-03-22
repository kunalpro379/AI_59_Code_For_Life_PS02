const mongoose = require('mongoose');
const zod = require('zod');

const salesOrderSchema = new mongoose.Schema({
    order_id: { type: String, required: true, unique: true },
    customer_id: { type: String, required: true },
    order_date: { type: Date, required: true },
    delivery_date: { type: Date, required: true },
    order_status: { type: String, required: true },
    payment_status: { type: String, required: true },
    total_amount: { type: Number, required: true },
    tax_amount: { type: Number, required: true },
    shipping_amount: { type: Number, required: true },
    grand_total: { type: Number, required: true },
    created_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const salesOrderValidationSchema = zod.object({
    customer_id: zod.string(),
    order_date: zod.string().transform(str => new Date(str)),
    delivery_date: zod.string().transform(str => new Date(str)),
    order_status: zod.enum(['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled']),
    payment_status: zod.enum(['Pending', 'Completed', 'Failed']),
    total_amount: zod.number(),
    tax_amount: zod.number(),
    shipping_amount: zod.number(),
    grand_total: zod.number(),
    created_by: zod.string()
});

const SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);

module.exports = {
    SalesOrder,
    salesOrderValidationSchema
};