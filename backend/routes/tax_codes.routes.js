const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { TaxCode } = require("../schemas/tax_codes.schema");
const zod = require("zod");

// Validation schema
const taxCodeSchema = zod.object({
    tax_code: zod.string(),
    tax_name: zod.string(),
    rate: zod.number(),
    description: zod.string(),
    is_active: zod.boolean().default(true),
});

// Create tax code
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = taxCodeSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const taxCodeData = {
            ...validation.data,
            code_id: `TAX-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const taxCode = new TaxCode(taxCodeData);
        await taxCode.save();

        res.status(201).json({
            message: "Tax code created successfully",
            data: taxCode,
        });
    } catch (error) {
        console.error("Create Tax Code Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all tax codes with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const taxCodes = await TaxCode.find()
            .skip(skip)
            .limit(limit);

        const total = await TaxCode.countDocuments();

        res.json({
            data: taxCodes,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get Tax Codes Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get tax code by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const taxCode = await TaxCode.findOne({
            code_id: req.params.id,
        });

        if (!taxCode) {
            return res.status(404).json({ message: "Tax code not found" });
        }

        res.json({ data: taxCode });
    } catch (error) {
        console.error("Get Tax Code Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update tax code
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = taxCodeSchema.safeParse(req.body);
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

        const taxCode = await TaxCode.findOneAndUpdate(
            { code_id: req.params.id },
            updateData,
            { new: true }
        );

        if (!taxCode) {
            return res.status(404).json({ message: "Tax code not found" });
        }

        res.json({
            message: "Tax code updated successfully",
            data: taxCode,
        });
    } catch (error) {
        console.error("Update Tax Code Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete tax code
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const taxCode = await TaxCode.findOneAndDelete({
            code_id: req.params.id,
        });

        if (!taxCode) {
            return res.status(404).json({ message: "Tax code not found" });
        }

        res.json({
            message: "Tax code deleted successfully",
            data: taxCode,
        });
    } catch (error) {
        console.error("Delete Tax Code Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;