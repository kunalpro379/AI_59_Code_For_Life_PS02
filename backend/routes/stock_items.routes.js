const express = require("express");
const router = express.Router();
const { StockItems } = require("../schemas/stock_items.schema");
const { validateRequest } = require("../middleware");
const { z } = require("zod");

// Validation schemas
const stockItemSchema = z.object({
    item_code: z.string(),
    item_name: z.string(),
    category_id: z.string(),
    description: z.string(),
    unit_of_measure: z.enum(["PCS", "KG", "LTR", "MTR", "BOX"]),
    current_stock: z.number().min(0),
    reorder_level: z.number().min(0),
    maximum_level: z.number().min(0),
    average_consumption: z.number().min(0),
    last_received_date: z.date(),
    last_issued_date: z.date(),
    status: z.enum(["In Stock", "Out of Stock", "Low Stock", "Discontinued"])
});

// Get all stock items with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const items = await StockItems.find()
            .skip(skip)
            .limit(limit);

        const total = await StockItems.countDocuments();

        res.json({
            data: items,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get stock item by ID
router.get("/:id", async (req, res) => {
    try {
        const item = await StockItems.findOne({ item_id: req.params.id });
        if (!item) {
            return res.status(404).json({ error: "Stock item not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new stock item
router.post("/", validateRequest(stockItemSchema), async (req, res) => {
    try {
        const item = new StockItems({
            item_id: require("crypto").randomUUID(),
            ...req.body
        });
        await item.save();
        res.status(201).json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update stock item
router.put("/:id", validateRequest(stockItemSchema), async (req, res) => {
    try {
        const item = await StockItems.findOneAndUpdate(
            { item_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!item) {
            return res.status(404).json({ error: "Stock item not found" });
        }
        res.json(item);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete stock item
router.delete("/:id", async (req, res) => {
    try {
        const item = await StockItems.findOneAndDelete({ item_id: req.params.id });
        if (!item) {
            return res.status(404).json({ error: "Stock item not found" });
        }
        res.json({ message: "Stock item deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;