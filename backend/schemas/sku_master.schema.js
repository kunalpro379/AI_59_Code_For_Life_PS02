const mongoose = require("mongoose");

const skuMasterSchema = new mongoose.Schema({
    sku_id: {
        type: String,
        required: true,
        unique: true
    },
    product_name: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    unit_price: {
        type: Number,
        required: true
    },
    unit_cost: {
        type: Number,
        required: true
    },
    stock_quantity: {
        type: Number,
        required: true
    },
    manufacturer: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    hsn_code: {
        type: String,
        required: true,
        trim: true
    },
    gst_percentage: {
        type: Number,
        required: true,
        default: 0
    },
    reorder_level: {
        type: Number,
        required: true
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

const SKUMaster = mongoose.model("SKUMaster", skuMasterSchema);

module.exports = { SKUMaster };