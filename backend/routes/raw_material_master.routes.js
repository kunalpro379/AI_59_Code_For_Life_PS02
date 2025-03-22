const express = require("express");
const router = express.Router();
const { RawMaterialMaster } = require("../schemas/raw_material_master.schema");
const { validateRequest } = require("../middleware");
const { z } = require("zod");

// Validation schemas
const rawMaterialSchema = z.object({
    material_code: z.string(),
    material_name: z.string(),
    category: z.string(),
    description: z.string(),
    unit_of_measure: z.enum(["PCS", "KG", "LTR", "MTR", "BOX"]),
    standard_cost: z.number().min(0),
    minimum_stock: z.number().min(0),
    maximum_stock: z.number().min(0),
    current_stock: z.number().min(0),
    shelf_life_days: z.number().min(0),
    storage_requirements: z.string(),
    quality_parameters: z.object({
        parameter1: z.string().optional(),
        parameter2: z.string().optional(),
        parameter3: z.string().optional()
    }),
    status: z.enum(["Active", "Inactive", "Under Review", "Discontinued"])
});

// Get all raw materials with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const materials = await RawMaterialMaster.find()
            .skip(skip)
            .limit(limit);

        const total = await RawMaterialMaster.countDocuments();

        res.json({
            data: materials,
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

// Get raw material by ID
router.get("/:id", async (req, res) => {
    try {
        const material = await RawMaterialMaster.findOne({ material_id: req.params.id });
        if (!material) {
            return res.status(404).json({ error: "Raw material not found" });
        }
        res.json(material);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new raw material
router.post("/", validateRequest(rawMaterialSchema), async (req, res) => {
    try {
        const material = new RawMaterialMaster({
            material_id: require("crypto").randomUUID(),
            ...req.body
        });
        await material.save();
        res.status(201).json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update raw material
router.put("/:id", validateRequest(rawMaterialSchema), async (req, res) => {
    try {
        const material = await RawMaterialMaster.findOneAndUpdate(
            { material_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!material) {
            return res.status(404).json({ error: "Raw material not found" });
        }
        res.json(material);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete raw material
router.delete("/:id", async (req, res) => {
    try {
        const material = await RawMaterialMaster.findOneAndDelete({ material_id: req.params.id });
        if (!material) {
            return res.status(404).json({ error: "Raw material not found" });
        }
        res.json({ message: "Raw material deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;