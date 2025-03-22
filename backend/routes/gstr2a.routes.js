const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { GSTR2A } = require("../schemas/gstr2a.schema");
const zod = require("zod");

// Validation schema
const gstr2aSchema = zod.object({
    gstin: zod.string(),
    trade_name: zod.string(),
    filing_period: zod.string(),
    invoice_number: zod.string(),
    invoice_type: zod.string(),
    invoice_date: zod.string().transform((str) => new Date(str)),
    invoice_value: zod.number(),
    place_of_supply: zod.string(),
    supply_type: zod.string(),
    taxable_value: zod.number(),
    igst: zod.number(),
    cgst: zod.number(),
    sgst: zod.number(),
    total_tax: zod.number(),
    status: zod.enum(["Pending", "Matched", "Partially Matched", "Not Matched"]).default("Pending"),
});

// Create GSTR2A record
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = gstr2aSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const gstr2aData = {
            ...validation.data,
            record_id: `GSTR2A-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const gstr2a = new GSTR2A(gstr2aData);
        await gstr2a.save();

        res.status(201).json({
            message: "GSTR2A record created successfully",
            data: gstr2a,
        });
    } catch (error) {
        console.error("Create GSTR2A Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all GSTR2A records with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const gstr2aRecords = await GSTR2A.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await GSTR2A.countDocuments();

        res.json({
            data: gstr2aRecords,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get GSTR2A Records Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get GSTR2A record by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const gstr2a = await GSTR2A.findOne({
            record_id: req.params.id,
        });

        if (!gstr2a) {
            return res.status(404).json({ message: "GSTR2A record not found" });
        }

        res.json({ data: gstr2a });
    } catch (error) {
        console.error("Get GSTR2A Record Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update GSTR2A record
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = gstr2aSchema.safeParse(req.body);
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

        const gstr2a = await GSTR2A.findOneAndUpdate(
            { record_id: req.params.id },
            updateData,
            { new: true }
        );

        if (!gstr2a) {
            return res.status(404).json({ message: "GSTR2A record not found" });
        }

        res.json({
            message: "GSTR2A record updated successfully",
            data: gstr2a,
        });
    } catch (error) {
        console.error("Update GSTR2A Record Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete GSTR2A record
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const gstr2a = await GSTR2A.findOneAndDelete({
            record_id: req.params.id,
        });

        if (!gstr2a) {
            return res.status(404).json({ message: "GSTR2A record not found" });
        }

        res.json({
            message: "GSTR2A record deleted successfully",
            data: gstr2a,
        });
    } catch (error) {
        console.error("Delete GSTR2A Record Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;