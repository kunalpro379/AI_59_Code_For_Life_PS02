const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { SkuMaster } = require("../schemas/sku_master.schema");
const zod = require("zod");

// Validation schema
const skuMasterSchema = zod.object({
    product_name: zod.string(),
    category: zod.string(),
    unit_price: zod.number(),
    unit_cost: zod.number(),
    stock_quantity: zod.number(),
    manufacturer: zod.string(),
    description: zod.string(),
    hsn_code: zod.string(),
    gst_percentage: zod.number(),
    status: zod.enum(["Active", "Inactive"]).default("Active"),
});

// Create SKU
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = skuMasterSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const skuData = {
            ...validation.data,
            sku_id: `SKU-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const sku = new SkuMaster(skuData);
        await sku.save();

        res.status(201).json({
            message: "SKU created successfully",
            data: sku,
        });
    } catch (error) {
        console.error("Create SKU Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all SKUs with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const skus = await SkuMaster.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await SkuMaster.countDocuments();

        res.json({
            data: skus,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get SKUs Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get SKU by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const sku = await SkuMaster.findOne({ sku_id: req.params.id });
        if (!sku) {
            return res.status(404).json({ message: "SKU not found" });
        }
        res.json({ data: sku });
    } catch (error) {
        console.error("Get SKU Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update SKU
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = skuMasterSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const sku = await SkuMaster.findOne({ sku_id: req.params.id });
        if (!sku) {
            return res.status(404).json({ message: "SKU not found" });
        }

        const updatedSku = await SkuMaster.findOneAndUpdate(
            { sku_id: req.params.id },
            {
                ...validation.data,
                last_updated: new Date(),
            },
            { new: true }
        );

        res.json({
            message: "SKU updated successfully",
            data: updatedSku,
        });
    } catch (error) {
        console.error("Update SKU Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete SKU
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const sku = await SkuMaster.findOne({ sku_id: req.params.id });
        if (!sku) {
            return res.status(404).json({ message: "SKU not found" });
        }

        await SkuMaster.findOneAndDelete({ sku_id: req.params.id });

        res.json({ message: "SKU deleted successfully" });
    } catch (error) {
        console.error("Delete SKU Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;