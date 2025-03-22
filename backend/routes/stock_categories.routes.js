const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { StockCategory } = require("../schemas/stock_categories.schema");
const zod = require("zod");

// Validation schema
const stockCategorySchema = zod.object({
    category_name: zod.string(),
    sub_category: zod.string(),
    description: zod.string(),
    unit_of_measure: zod.string(),
    reorder_level: zod.number(),
    maximum_level: zod.number(),
    shelf_life_days: zod.number(),
    storage_requirements: zod.string(),
    status: zod.enum(["Active", "Inactive"]).default("Active"),
});

// Create stock category
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = stockCategorySchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const categoryData = {
            ...validation.data,
            category_id: `CAT-${Date.now()}`,
            created_by: req.userId,
        };

        const stockCategory = new StockCategory(categoryData);
        await stockCategory.save();

        res.status(201).json({
            message: "Stock category created successfully",
            data: stockCategory,
        });
    } catch (error) {
        console.error("Create Stock Category Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all stock categories with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const stockCategories = await StockCategory.find()
            .skip(skip)
            .limit(limit);

        const total = await StockCategory.countDocuments();

        res.json({
            data: stockCategories,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get Stock Categories Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get stock category by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const stockCategory = await StockCategory.findOne({
            category_id: req.params.id,
        });

        if (!stockCategory) {
            return res.status(404).json({ message: "Stock category not found" });
        }

        res.json({ data: stockCategory });
    } catch (error) {
        console.error("Get Stock Category Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update stock category
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = stockCategorySchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const stockCategory = await StockCategory.findOneAndUpdate(
            { category_id: req.params.id },
            validation.data,
            { new: true }
        );

        if (!stockCategory) {
            return res.status(404).json({ message: "Stock category not found" });
        }

        res.json({
            message: "Stock category updated successfully",
            data: stockCategory,
        });
    } catch (error) {
        console.error("Update Stock Category Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete stock category
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const stockCategory = await StockCategory.findOneAndDelete({
            category_id: req.params.id,
        });

        if (!stockCategory) {
            return res.status(404).json({ message: "Stock category not found" });
        }

        res.json({
            message: "Stock category deleted successfully",
            data: stockCategory,
        });
    } catch (error) {
        console.error("Delete Stock Category Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;