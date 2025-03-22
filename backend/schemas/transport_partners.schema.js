const mongoose = require('mongoose');
const { z } = require('zod');

const transportPartnerSchema = new mongoose.Schema({
    partner_id: { type: String, required: true, unique: true },
    partner_code: { type: String, required: true },
    partner_name: { type: String, required: true },
    contact_person: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    gst_number: { type: String, required: true },
    pan_number: { type: String, required: true },
    service_areas: [{ type: String, required: true }],
    shipping_modes: [{ type: String, required: true }],
    rating: { type: Number, required: true, min: 0, max: 5 },
    status: { type: String, enum: ['Active', 'Inactive', 'Suspended'], required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const TransportPartner = mongoose.model('TransportPartner', transportPartnerSchema);

const transportPartnerValidationSchema = z.object({
    partner_code: z.string(),
    partner_name: z.string(),
    contact_person: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    gst_number: z.string(),
    pan_number: z.string(),
    service_areas: z.array(z.string()),
    shipping_modes: z.array(z.string()),
    rating: z.number().min(0).max(5),
    status: z.enum(['Active', 'Inactive', 'Suspended'])
});

module.exports = {
    TransportPartner,
    transportPartnerValidationSchema
};