const express = require("express");
const router = express.Router();
const { MaterialRevalidation } = require("../schemas/material_revalidation.schema");
const { validateRequest } = require("../middleware");
const { z } = require("zod");

// Validation schemas
const testResultSchema = z.object({
    parameter_id: z.string(),
    measured_value: z.number(),
    status: z.enum(["Pass", "Fail"]),
    remarks: z.string()
});

const materialRevalidationSchema = z.object({
    material_code: z.string(),
    batch_number: z.string(),
    revalidation_date: z.string().transform(str => new Date(str)),
    reason: z.string(),
    test_results: z.array(testResultSchema),
    overall_status: z.enum(["Pass", "Fail", "Conditional Pass"]),
    valid_until: z.string().transform(str => new Date(str)),
    approved_by: z.string(),
    remarks: z.string()
});

// Get all material revalidations with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const revalidations = await MaterialRevalidation.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await MaterialRevalidation.countDocuments();

        res.json({
            data: revalidations,
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

// Get material revalidation by ID
router.get("/:id", async (req, res) => {
    try {
        const revalidation = await MaterialRevalidation.findOne({ revalidation_id: req.params.id });
        if (!revalidation) {
            return res.status(404).json({ error: "Material revalidation not found" });
        }
        res.json(revalidation);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new material revalidation
router.post("/", validateRequest(materialRevalidationSchema), async (req, res) => {
    try {
        const revalidation = new MaterialRevalidation({
            revalidation_id: `REV${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            ...req.body,
            created_date: new Date(),
            last_updated: new Date()
        });
        await revalidation.save();
        res.status(201).json(revalidation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update material revalidation
router.put("/:id", validateRequest(materialRevalidationSchema), async (req, res) => {
    try {
        const revalidation = await MaterialRevalidation.findOneAndUpdate(
            { revalidation_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!revalidation) {
            return res.status(404).json({ error: "Material revalidation not found" });
        }
        res.json(revalidation);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete material revalidation
router.delete("/:id", async (req, res) => {
    try {
        const revalidation = await MaterialRevalidation.findOneAndDelete({ revalidation_id: req.params.id });
        if (!revalidation) {
            return res.status(404).json({ error: "Material revalidation not found" });
        }
        res.json({ message: "Material revalidation deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;