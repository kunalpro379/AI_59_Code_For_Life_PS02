const express = require("express");
const router = express.Router();
const { BatchReleases } = require("../schemas/batch_releases.schema");
const { validateRequest } = require("../middleware");
const { z } = require("zod");

// Validation schemas
const conditionSchema = z.object({
    condition_id: z.string(),
    description: z.string(),
    status: z.enum(["Pending", "Completed", "Failed"])
});

const batchReleaseSchema = z.object({
    batch_id: z.string(),
    product_code: z.string(),
    release_date: z.string().transform(str => new Date(str)),
    quality_status: z.enum(["Approved", "Rejected", "On Hold"]),
    release_type: z.enum(["Full", "Conditional", "Partial"]),
    conditions: z.array(conditionSchema),
    approved_by: z.string(),
    remarks: z.string(),
    created_by: z.string()
});

// Get all batch releases with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const releases = await BatchReleases.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await BatchReleases.countDocuments();

        res.json({
            data: releases,
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

// Get batch release by ID
router.get("/:id", async (req, res) => {
    try {
        const release = await BatchReleases.findOne({ release_id: req.params.id });
        if (!release) {
            return res.status(404).json({ error: "Batch release not found" });
        }
        res.json(release);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new batch release
router.post("/", validateRequest(batchReleaseSchema), async (req, res) => {
    try {
        const release = new BatchReleases({
            release_id: `REL${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            ...req.body,
            created_date: new Date(),
            last_updated: new Date()
        });
        await release.save();
        res.status(201).json(release);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update batch release
router.put("/:id", validateRequest(batchReleaseSchema), async (req, res) => {
    try {
        const release = await BatchReleases.findOneAndUpdate(
            { release_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!release) {
            return res.status(404).json({ error: "Batch release not found" });
        }
        res.json(release);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete batch release
router.delete("/:id", async (req, res) => {
    try {
        const release = await BatchReleases.findOneAndDelete({ release_id: req.params.id });
        if (!release) {
            return res.status(404).json({ error: "Batch release not found" });
        }
        res.json({ message: "Batch release deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;