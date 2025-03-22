const mongoose = require('mongoose');
const { z } = require('zod');

const sacCodeSchema = new mongoose.Schema({
    sac_id: { type: String, required: true, unique: true },
    sac_code: { type: String, required: true },
    description: { type: String, required: true },
    gst_rate: { type: Number, required: true, min: 0 },
    cgst_rate: { type: Number, required: true, min: 0 },
    sgst_rate: { type: Number, required: true, min: 0 },
    igst_rate: { type: Number, required: true, min: 0 },
    is_active: { type: Boolean, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const SacCode = mongoose.model('SacCode', sacCodeSchema);

const sacCodeValidationSchema = z.object({
    sac_code: z.string(),
    description: z.string(),
    gst_rate: z.number().min(0),
    cgst_rate: z.number().min(0),
    sgst_rate: z.number().min(0),
    igst_rate: z.number().min(0),
    is_active: z.boolean()
});

module.exports = {
    SacCode,
    sacCodeValidationSchema
};