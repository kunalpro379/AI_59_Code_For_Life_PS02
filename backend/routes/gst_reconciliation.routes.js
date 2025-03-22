const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { GSTReconciliation } = require("../schemas/gst_reconciliation.schema");
const zod = require("zod");

// Validation schema
const gstReconciliationSchema = zod.object({
    period: zod.string(),
    gstr1_total: zod.number(),
    gstr2a_total: zod.number(),
    gstr3b_total: zod.number(),
    discrepancy_amount: zod.number(),
    reconciliation_status: zod.enum(["Pending", "In Progress", "Completed", "Discrepancy Found"]),
    remarks: zod.string().optional()
});

// Create GST reconciliation
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = gstReconciliationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const reconciliationData = {
            ...validation.data,
            reconciliation_id: `REC-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const reconciliation = new GSTReconciliation(reconciliationData);
        await reconciliation.save();

        res.status(201).json({
            message: "GST reconciliation created successfully",
            data: reconciliation,
        });
    } catch (error) {
        console.error("Create GST Reconciliation Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all GST reconciliations with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const reconciliations = await GSTReconciliation.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await GSTReconciliation.countDocuments();

        res.json({
            data: reconciliations,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get GST Reconciliations Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get GST reconciliation by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const reconciliation = await GSTReconciliation.findOne({
            reconciliation_id: req.params.id,
        });

        if (!reconciliation) {
            return res.status(404).json({ message: "GST reconciliation not found" });
        }

        res.json({ data: reconciliation });
    } catch (error) {
        console.error("Get GST Reconciliation Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update GST reconciliation
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = gstReconciliationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const reconciliation = await GSTReconciliation.findOneAndUpdate(
            { reconciliation_id: req.params.id },
            {
                ...validation.data,
                last_updated: new Date(),
            },
            { new: true }
        );

        if (!reconciliation) {
            return res.status(404).json({ message: "GST reconciliation not found" });
        }

        res.json({
            message: "GST reconciliation updated successfully",
            data: reconciliation,
        });
    } catch (error) {
        console.error("Update GST Reconciliation Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete GST reconciliation
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const reconciliation = await GSTReconciliation.findOneAndDelete({
            reconciliation_id: req.params.id,
        });

        if (!reconciliation) {
            return res.status(404).json({ message: "GST reconciliation not found" });
        }

        res.json({
            message: "GST reconciliation deleted successfully",
            data: reconciliation,
        });
    } catch (error) {
        console.error("Delete GST Reconciliation Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;