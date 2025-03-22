const mongoose = require("mongoose");

const parameterSchema = new mongoose.Schema({
    parameter_id: {
        type: String,
        required: true
    },
    parameter_name: {
        type: String,
        required: true,
        trim: true
    },
    unit: {
        type: String,
        required: true,
        trim: true
    },
    min_value: {
        type: Number,
        required: true
    },
    max_value: {
        type: Number,
        required: true
    },
    target_value: {
        type: Number,
        required: true
    }
});

const standardSpecificationSchema = new mongoose.Schema({
    specification_id: {
        type: String,
        required: true,
        unique: true
    },
    specification_code: {
        type: String,
        required: true,
        unique: true
    },
    specification_name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    parameters: [parameterSchema],
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

const StandardSpecification = mongoose.model("StandardSpecification", standardSpecificationSchema);

module.exports = { StandardSpecification };