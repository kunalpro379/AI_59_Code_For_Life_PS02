const mongoose = require("mongoose");

const rawMaterialMasterSchema = new mongoose.Schema({
    material_id: {
        type: String,
        required: true,
        unique: true
    },
    material_code: {
        type: String,
        required: true,
        unique: true
    },
    material_name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    unit_of_measure: {
        type: String,
        required: true,
        enum: ["PCS", "KG", "LTR", "MTR", "BOX"]
    },
    standard_cost: {
        type: Number,
        required: true,
        min: 0
    },
    minimum_stock: {
        type: Number,
        required: true,
        min: 0
    },
    maximum_stock: {
        type: Number,
        required: true,
        min: 0
    },
    current_stock: {
        type: Number,
        required: true,
        min: 0
    },
    shelf_life_days: {
        type: Number,
        required: true,
        min: 0
    },
    storage_requirements: {
        type: String,
        required: true
    },
    quality_parameters: {
        parameter1: String,
        parameter2: String,
        parameter3: String
    },
    status: {
        type: String,
        required: true,
        enum: ["Active", "Inactive", "Under Review", "Discontinued"]
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

const RawMaterialMaster = mongoose.model("RawMaterialMaster", rawMaterialMasterSchema);

module.exports = { RawMaterialMaster };