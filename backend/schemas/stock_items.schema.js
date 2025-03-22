const mongoose = require("mongoose");

const stockItemsSchema = new mongoose.Schema({
    item_id: {
        type: String,
        required: true,
        unique: true
    },
    item_code: {
        type: String,
        required: true,
        unique: true
    },
    item_name: {
        type: String,
        required: true
    },
    category_id: {
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
    current_stock: {
        type: Number,
        required: true,
        min: 0
    },
    reorder_level: {
        type: Number,
        required: true,
        min: 0
    },
    maximum_level: {
        type: Number,
        required: true,
        min: 0
    },
    average_consumption: {
        type: Number,
        required: true,
        min: 0
    },
    last_received_date: {
        type: Date,
        required: true
    },
    last_issued_date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["In Stock", "Out of Stock", "Low Stock", "Discontinued"]
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

const StockItems = mongoose.model("StockItems", stockItemsSchema);

module.exports = { StockItems };