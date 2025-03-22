const express = require("express");
const router = express.Router();
const { validateRequest } = require("../middleware");
const { z } = require("zod");

// Validation schema
const hsnCodeSchema = z.object({
    hsn_code: z.string(),
    description: z.string(),
    gst_rate: z.number().min(0),
    cgst_rate: z.number().min(0),
    sgst_rate: z.number().min(0),
    igst_rate: z.number().min(0),
    is_active: z.boolean().default(true)
});

// Get all HSN codes with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const hsnCodes = await HsnCodes.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await HsnCodes.countDocuments();

        res.json({
            data: hsnCodes,
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

// Get HSN code by ID
router.get("/:id", async (req, res) => {
    try {
        const hsnCode = await HsnCodes.findOne({ hsn_id: req.params.id });
        if (!hsnCode) {
            return res.status(404).json({ error: "HSN code not found" });
        }
        res.json(hsnCode);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new HSN code
router.post("/", validateRequest(hsnCodeSchema), async (req, res) => {
    try {
        const hsnCode = new HsnCodes({
            hsn_id: require("crypto").randomUUID(),
            ...req.body,
            created_date: new Date(),
            last_updated: new Date()
        });
        await hsnCode.save();
        res.status(201).json(hsnCode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update HSN code
router.put("/:id", validateRequest(hsnCodeSchema), async (req, res) => {
    try {
        const hsnCode = await HsnCodes.findOneAndUpdate(
            { hsn_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!hsnCode) {
            return res.status(404).json({ error: "HSN code not found" });
        }
        res.json(hsnCode);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete HSN code
router.delete("/:id", async (req, res) => {
    try {
        const hsnCode = await HsnCodes.findOneAndDelete({ hsn_id: req.params.id });
        if (!hsnCode) {
            return res.status(404).json({ error: "HSN code not found" });
        }
        res.json({ message: "HSN code deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;