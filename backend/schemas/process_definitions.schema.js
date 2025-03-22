const mongoose = require("mongoose");

const processDefinitionSchema = new mongoose.Schema({
    process_id: {
        type: String,
        required: true,
        unique: true
    },
    process_code: {
        type: String,
        required: true,
        unique: true
    },
    process_name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    standard_time_minutes: {
        type: Number,
        required: true
    },
    setup_time_minutes: {
        type: Number,
        required: true
    },
    cleanup_time_minutes: {
        type: Number,
        required: true
    },
    required_skills: [{
        type: String,
        required: true
    }],
    required_tools: [{
        type: String,
        required: true
    }],
    quality_checkpoints: {
        type: Number,
        required: true
    },
    temperature_requirements: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    created_date: {
        type: Date,
        default: Date.now
    },
    last_updated: {
        type: Date,
        default: Date.now
    }
});

const ProcessDefinition = mongoose.model("ProcessDefinition", processDefinitionSchema);

module.exports = { ProcessDefinition };