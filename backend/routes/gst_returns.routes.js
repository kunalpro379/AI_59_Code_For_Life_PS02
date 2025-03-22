const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { GSTReturn } = require("../schemas/gst_returns.schema");
const zod = require("zod");

// Validation schema
const gstReturnSchema = zod.object({
    return_type: zod.enum(["GSTR-1", "GSTR-2A", "GSTR-3B", "GSTR-9"]),
    filing_period: zod.string(),
    due_date: zod.string().transform((str) => new Date(str)),
    filing_date: zod.string().transform((str) => new Date(str)),
    total_tax_liability: zod.number(),
    total_input_tax: zod.number(),
    tax_payable: zod.number(),
    status: zod.enum(["Draft", "Pending", "Filed", "Error"]),
    remarks: zod.string().optional()
});

// Create GST return
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = gstReturnSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const returnData = {
            ...validation.data,
            return_id: `GSTR-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const gstReturn = new GSTReturn(returnData);
        await gstReturn.save();

        res.status(201).json({
            message: "GST return created successfully",
            data: gstReturn,
        });
    } catch (error) {
        console.error("Create GST Return Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all GST returns with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const returns = await GSTReturn.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await GSTReturn.countDocuments();

        res.json({
            data: returns,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get GST Returns Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get GST return by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const gstReturn = await GSTReturn.findOne({
            return_id: req.params.id,
        });

        if (!gstReturn) {
            return res.status(404).json({ message: "GST return not found" });
        }

        res.json({ data: gstReturn });
    } catch (error) {
        console.error("Get GST Return Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update GST return
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = gstReturnSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const gstReturn = await GSTReturn.findOneAndUpdate(
            { return_id: req.params.id },
            {
                ...validation.data,
                last_updated: new Date(),
            },
            { new: true }
        );

        if (!gstReturn) {
            return res.status(404).json({ message: "GST return not found" });
        }

        res.json({
            message: "GST return updated successfully",
            data: gstReturn,
        });
    } catch (error) {
        console.error("Update GST Return Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete GST return
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const gstReturn = await GSTReturn.findOneAndDelete({
            return_id: req.params.id,
        });

        if (!gstReturn) {
            return res.status(404).json({ message: "GST return not found" });
        }

        res.json({
            message: "GST return deleted successfully",
            data: gstReturn,
        });
    } catch (error) {
        console.error("Delete GST Return Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;