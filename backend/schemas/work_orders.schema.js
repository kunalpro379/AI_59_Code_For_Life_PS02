const mongoose = require('mongoose');
const { z } = require('zod');

const workOrderSchema = new mongoose.Schema({
    work_order_id: { type: String, required: true, unique: true },
    batch_id: { type: String, required: true },
    process_id: { type: String, required: true },
    order_date: { type: Date, required: true },
    planned_start_date: { type: Date, required: true },
    planned_end_date: { type: Date, required: true },
    actual_start_date: { type: Date },
    actual_end_date: { type: Date },
    planned_quantity: { type: Number, required: true },
    actual_quantity: { type: Number },
    status: { 
        type: String, 
        required: true,
        enum: ['Pending', 'In Progress', 'Completed', 'Cancelled']
    },
    priority: { 
        type: String, 
        required: true,
        enum: ['Low', 'Medium', 'High', 'Critical']
    },
    remarks: { type: String },
    created_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const WorkOrder = mongoose.model('WorkOrder', workOrderSchema);

const workOrderValidationSchema = z.object({
    batch_id: z.string(),
    process_id: z.string(),
    order_date: z.string().or(z.date()),
    planned_start_date: z.string().or(z.date()),
    planned_end_date: z.string().or(z.date()),
    actual_start_date: z.string().or(z.date()).optional(),
    actual_end_date: z.string().or(z.date()).optional(),
    planned_quantity: z.number().positive(),
    actual_quantity: z.number().positive().optional(),
    status: z.enum(['Pending', 'In Progress', 'Completed', 'Cancelled']),
    priority: z.enum(['Low', 'Medium', 'High', 'Critical']),
    remarks: z.string().optional(),
    created_by: z.string()
});

module.exports = {
    WorkOrder,
    workOrderValidationSchema
};