const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { ProductionInventory } = require("../schemas/production_inventory.schema");
const zod = require("zod");

// Validation schema
const productionInventorySchema = zod.object({
    item_code: zod.string(),
    item_name: zod.string(),
    batch_number: zod.string(),
    quantity: zod.number(),
    unit: zod.string(),
    status: zod.enum(["In Production", "Completed", "On Hold", "Scrapped"]).default("In Production"),
    location: zod.string(),
    expiry_date: zod.string().transform((str) => new Date(str)).optional(),
    remarks: zod.string().optional(),
});

// Create production inventory
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = productionInventorySchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const inventoryData = {
            ...validation.data,
            inventory_id: `INV-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const productionInventory = new ProductionInventory(inventoryData);
        await productionInventory.save();

        res.status(201).json({
            message: "Production inventory created successfully",
            data: productionInventory,
        });
    } catch (error) {
        console.error("Create Production Inventory Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all production inventory items with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const inventoryItems = await ProductionInventory.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await ProductionInventory.countDocuments();

        res.json({
            data: inventoryItems,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get Production Inventory Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get production inventory item by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const inventoryItem = await ProductionInventory.findOne({
            inventory_id: req.params.id,
        });

        if (!inventoryItem) {
            return res.status(404).json({ message: "Production inventory item not found" });
        }

        res.json({ data: inventoryItem });
    } catch (error) {
        console.error("Get Production Inventory Item Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update production inventory item
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = productionInventorySchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const updateData = {
            ...validation.data,
            last_updated: new Date(),
        };

        const inventoryItem = await ProductionInventory.findOneAndUpdate(
            { inventory_id: req.params.id },
            updateData,
            { new: true }
        );

        if (!inventoryItem) {
            return res.status(404).json({ message: "Production inventory item not found" });
        }

        res.json({
            message: "Production inventory item updated successfully",
            data: inventoryItem,
        });
    } catch (error) {
        console.error("Update Production Inventory Item Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete production inventory item
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const inventoryItem = await ProductionInventory.findOneAndDelete({
            inventory_id: req.params.id,
        });

        if (!inventoryItem) {
            return res.status(404).json({ message: "Production inventory item not found" });
        }

        res.json({
            message: "Production inventory item deleted successfully",
            data: inventoryItem,
        });
    } catch (error) {
        console.error("Delete Production Inventory Item Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;