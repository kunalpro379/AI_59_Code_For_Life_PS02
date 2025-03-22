const mongoose = require('mongoose');
const { z } = require('zod');

const checkpointSchema = new mongoose.Schema({
    point_id: { type: String, required: true },
    checkpoint_name: { type: String, required: true },
    description: { type: String, required: true },
    acceptance_criteria: { type: String, required: true },
    measurement_unit: { type: String, required: true },
    is_mandatory: { type: Boolean, required: true }
});

const inspectionChecklistSchema = new mongoose.Schema({
    checklist_id: { type: String, required: true, unique: true },
    checklist_code: { type: String, required: true },
    checklist_name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    checkpoints: [checkpointSchema],
    status: { type: String, enum: ['Active', 'Inactive'], required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const InspectionChecklist = mongoose.model('InspectionChecklist', inspectionChecklistSchema);

const checkpointValidationSchema = z.object({
    checkpoint_name: z.string(),
    description: z.string(),
    acceptance_criteria: z.string(),
    measurement_unit: z.string(),
    is_mandatory: z.boolean()
});

const inspectionChecklistValidationSchema = z.object({
    checklist_code: z.string(),
    checklist_name: z.string(),
    category: z.string(),
    description: z.string(),
    checkpoints: z.array(checkpointValidationSchema),
    status: z.enum(['Active', 'Inactive'])
});

module.exports = {
    InspectionChecklist,
    inspectionChecklistValidationSchema
};