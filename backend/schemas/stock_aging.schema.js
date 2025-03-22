const mongoose = require('mongoose');
const { z } = require('zod');

const stockAgingSchema = new mongoose.Schema({
    aging_id: { type: String, required: true, unique: true },
    item_id: { type: String, required: true },
    aging_date: { type: Date, required: true },
    current_stock: { type: Number, required: true, min: 0 },
    stock_value: { type: Number, required: true, min: 0 },
    age_brackets: {
        '0-30_days': { type: Number, required: true, min: 0 },
        '31-60_days': { type: Number, required: true, min: 0 },
        '61-90_days': { type: Number, required: true, min: 0 },
        '90_plus_days': { type: Number, required: true, min: 0 }
    },
    last_movement_date: { type: Date, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const StockAging = mongoose.model('StockAging', stockAgingSchema);

const stockAgingValidationSchema = z.object({
    item_id: z.string(),
    aging_date: z.string().transform(str => new Date(str)),
    current_stock: z.number().min(0),
    stock_value: z.number().min(0),
    age_brackets: z.object({
        '0-30_days': z.number().min(0),
        '31-60_days': z.number().min(0),
        '61-90_days': z.number().min(0),
        '90_plus_days': z.number().min(0)
    }),
    last_movement_date: z.string().transform(str => new Date(str))
});

module.exports = {
    StockAging,
    stockAgingValidationSchema
};