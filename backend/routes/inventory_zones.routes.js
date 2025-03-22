const express = require("express");
const router = express.Router();
const { z } = require("zod");
const { validateRequest } = require("../middleware");

// Validation schema
const inventoryZoneSchema = z.object({
    zone_name: z.string(),
    location_code: z.string(),
    description: z.string(),
    capacity: z.number().min(0),
    current_occupancy: z.number().min(0),
    temperature_controlled: z.boolean(),
    temperature_range: z.string().nullable(),
    status: z.enum(["Available", "Full", "Maintenance", "Reserved"])
});

// Get all inventory zones with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const zones = await InventoryZones.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await InventoryZones.countDocuments();

        res.json({
            data: zones,
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

// Get inventory zone by ID
router.get("/:id", async (req, res) => {
    try {
        const zone = await InventoryZones.findOne({ zone_id: req.params.id });
        if (!zone) {
            return res.status(404).json({ error: "Inventory zone not found" });
        }
        res.json(zone);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new inventory zone
router.post("/", validateRequest(inventoryZoneSchema), async (req, res) => {
    try {
        const zone = new InventoryZones({
            zone_id: require("crypto").randomUUID(),
            ...req.body,
            created_date: new Date(),
            last_updated: new Date()
        });
        await zone.save();
        res.status(201).json(zone);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update inventory zone
router.put("/:id", validateRequest(inventoryZoneSchema), async (req, res) => {
    try {
        const zone = await InventoryZones.findOneAndUpdate(
            { zone_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!zone) {
            return res.status(404).json({ error: "Inventory zone not found" });
        }
        res.json(zone);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete inventory zone
router.delete("/:id", async (req, res) => {
    try {
        const zone = await InventoryZones.findOneAndDelete({ zone_id: req.params.id });
        if (!zone) {
            return res.status(404).json({ error: "Inventory zone not found" });
        }
        res.json({ message: "Inventory zone deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;