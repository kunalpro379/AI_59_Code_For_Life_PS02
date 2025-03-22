const mongoose = require("mongoose");

const stockCategorySchema = new mongoose.Schema({
    category_id: {
        type: String,
        required: true,
        unique: true
    },
    category_name: {
        type: String,
        required: true,
        trim: true
    },
    sub_category: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    unit_of_measure: {
        type: String,
        required: true,
        trim: true
    },
    reorder_level: {
        type: Number,
        required: true
    },
    maximum_level: {
        type: Number,
        required: true
    },
    shelf_life_days: {
        type: Number,
        required: true
    },
    storage_requirements: {
        type: String,
        required: true,
        trim: true
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

const StockCategory = mongoose.model("StockCategory", stockCategorySchema);

module.exports = { StockCategory };