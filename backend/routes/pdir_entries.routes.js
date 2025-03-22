const express = require("express");
const router = express.Router();
const { PdirEntries } = require("../schemas/pdir_entries.schema");
const { validateRequest } = require("../middleware");
const { z } = require("zod");

// Validation schemas
const resultSchema = z.object({
    checkpoint_id: z.string(),
    measured_value: z.number(),
    status: z.enum(["Pass", "Fail", "Marginal"]),
    remarks: z.string()
});

const pdirEntriesSchema = z.object({
    product_code: z.string(),
    batch_number: z.string(),
    inspection_date: z.string().transform(str => new Date(str)),
    checklist_id: z.string(),
    specification_id: z.string(),
    inspector_id: z.string(),
    results: z.array(resultSchema),
    overall_status: z.enum(["Passed", "Failed", "Pending"]),
    remarks: z.string(),
    created_by: z.string()
});

// Get all PDIR entries with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const entries = await PdirEntries.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await PdirEntries.countDocuments();

        res.json({
            data: entries,
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

// Get PDIR entry by ID
router.get("/:id", async (req, res) => {
    try {
        const entry = await PdirEntries.findOne({ pdir_id: req.params.id });
        if (!entry) {
            return res.status(404).json({ error: "PDIR entry not found" });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new PDIR entry
router.post("/", validateRequest(pdirEntriesSchema), async (req, res) => {
    try {
        const entry = new PdirEntries({
            pdir_id: `PDIR${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            ...req.body,
            created_date: new Date(),
            last_updated: new Date()
        });
        await entry.save();
        res.status(201).json(entry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update PDIR entry
router.put("/:id", validateRequest(pdirEntriesSchema), async (req, res) => {
    try {
        const entry = await PdirEntries.findOneAndUpdate(
            { pdir_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!entry) {
            return res.status(404).json({ error: "PDIR entry not found" });
        }
        res.json(entry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete PDIR entry
router.delete("/:id", async (req, res) => {
    try {
        const entry = await PdirEntries.findOneAndDelete({ pdir_id: req.params.id });
        if (!entry) {
            return res.status(404).json({ error: "PDIR entry not found" });
        }
        res.json({ message: "PDIR entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;