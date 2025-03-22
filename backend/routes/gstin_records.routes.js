const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { GSTINRecord } = require("../schemas/gstin_records.schema");
const zod = require("zod");

// Validation schema
const gstinRecordSchema = zod.object({
    gstin: zod.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/),
    legal_name: zod.string(),
    trade_name: zod.string(),
    address: zod.string(),
    state_code: zod.string().regex(/^[0-9]{2}$/),
    registration_type: zod.enum(["Regular", "Composition", "Unregistered", "Input Service Distributor"]),
    registration_date: zod.string().transform((str) => new Date(str)),
    status: zod.enum(["Active", "Inactive", "Suspended", "Cancelled"]),
    remarks: zod.string().optional()
});

// Create GSTIN record
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = gstinRecordSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const recordData = {
            ...validation.data,
            record_id: `GSTIN-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const record = new GSTINRecord(recordData);
        await record.save();

        res.status(201).json({
            message: "GSTIN record created successfully",
            data: record,
        });
    } catch (error) {
        console.error("Create GSTIN Record Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all GSTIN records with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const records = await GSTINRecord.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await GSTINRecord.countDocuments();

        res.json({
            data: records,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get GSTIN Records Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get GSTIN record by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const record = await GSTINRecord.findOne({
            record_id: req.params.id,
        });

        if (!record) {
            return res.status(404).json({ message: "GSTIN record not found" });
        }

        res.json({ data: record });
    } catch (error) {
        console.error("Get GSTIN Record Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update GSTIN record
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = gstinRecordSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const record = await GSTINRecord.findOneAndUpdate(
            { record_id: req.params.id },
            {
                ...validation.data,
                last_updated: new Date(),
            },
            { new: true }
        );

        if (!record) {
            return res.status(404).json({ message: "GSTIN record not found" });
        }

        res.json({
            message: "GSTIN record updated successfully",
            data: record,
        });
    } catch (error) {
        console.error("Update GSTIN Record Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete GSTIN record
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const record = await GSTINRecord.findOneAndDelete({
            record_id: req.params.id,
        });

        if (!record) {
            return res.status(404).json({ message: "GSTIN record not found" });
        }

        res.json({
            message: "GSTIN record deleted successfully",
            data: record,
        });
    } catch (error) {
        console.error("Delete GSTIN Record Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;