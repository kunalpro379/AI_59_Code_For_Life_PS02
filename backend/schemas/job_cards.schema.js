const mongoose = require('mongoose');
const zod = require('zod');

const jobCardSchema = new mongoose.Schema({
    job_card_id: { type: String, required: true, unique: true },
    work_order_id: { type: String, required: true },
    operator_id: { type: String, required: true },
    machine_id: { type: String, required: true },
    start_time: { type: Date, required: true },
    end_time: { type: Date, required: true },
    planned_quantity: { type: Number, required: true },
    actual_quantity: { type: Number, required: true },
    rejected_quantity: { type: Number, required: true },
    status: { type: String, required: true },
    quality_status: { type: String, required: true },
    remarks: { type: String },
    created_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const jobCardValidationSchema = zod.object({
    work_order_id: zod.string(),
    operator_id: zod.string(),
    machine_id: zod.string(),
    start_time: zod.string().transform(str => new Date(str)),
    end_time: zod.string().transform(str => new Date(str)),
    planned_quantity: zod.number(),
    actual_quantity: zod.number(),
    rejected_quantity: zod.number(),
    status: zod.enum(['Active', 'Completed', 'Paused', 'Cancelled']),
    quality_status: zod.enum(['Pending', 'Approved', 'Rejected']),
    remarks: zod.string().optional().nullable(),
    created_by: zod.string()
});

const JobCard = mongoose.model('JobCard', jobCardSchema);

module.exports = {
    JobCard,
    jobCardValidationSchema
};