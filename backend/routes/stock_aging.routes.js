const express = require("express");
const router = express.Router();
const { StockAging, stockAgingValidationSchema } = require("../schemas/stock_aging.schema");
const { validateRequest } = require("../middleware");

// Get all stock aging records with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const records = await StockAging.find()
            .skip(skip)
            .limit(limit)
            .sort({ aging_date: -1 });

        const total = await StockAging.countDocuments();

        res.json({
            data: records,
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

// Get stock aging record by ID
router.get("/:id", async (req, res) => {
    try {
        const record = await StockAging.findOne({ aging_id: req.params.id });
        if (!record) {
            return res.status(404).json({ error: "Stock aging record not found" });
        }
        res.json(record);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new stock aging record
router.post("/", validateRequest(stockAgingValidationSchema), async (req, res) => {
    try {
        const record = new StockAging({
            aging_id: require("crypto").randomUUID(),
            ...req.body,
            created_date: new Date(),
            last_updated: new Date()
        });
        await record.save();
        res.status(201).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update stock aging record
router.put("/:id", validateRequest(stockAgingValidationSchema), async (req, res) => {
    try {
        const record = await StockAging.findOneAndUpdate(
            { aging_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!record) {
            return res.status(404).json({ error: "Stock aging record not found" });
        }
        res.json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete stock aging record
router.delete("/:id", async (req, res) => {
    try {
        const record = await StockAging.findOneAndDelete({ aging_id: req.params.id });
        if (!record) {
            return res.status(404).json({ error: "Stock aging record not found" });
        }
        res.json({ message: "Stock aging record deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;