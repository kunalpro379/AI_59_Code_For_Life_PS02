const mongoose = require("mongoose");

const productionInventorySchema = new mongoose.Schema({
    inventory_id: {
        type: String,
        required: true,
        unique: true
    },
    product_code: {
        type: String,
        required: true
    },
    batch_id: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit_of_measure: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        required: true,
        enum: ["Available", "Reserved", "Blocked"],
        default: "Available"
    },
    quality_status: {
        type: String,
        required: true,
        enum: ["Pending", "Passed", "Failed"],
        default: "Pending"
    },
    last_movement_date: {
        type: Date,
        required: true
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

const ProductionInventory = mongoose.model("ProductionInventory", productionInventorySchema);

module.exports = { ProductionInventory };