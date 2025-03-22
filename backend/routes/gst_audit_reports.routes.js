const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { GSTAuditReport } = require("../schemas/gst_audit_reports.schema");
const zod = require("zod");

// Validation schema
const gstAuditReportSchema = zod.object({
    report_type: zod.enum(["GSTR-9", "GSTR-9C"]),
    financial_year: zod.string(),
    generation_date: zod.string().transform((str) => new Date(str)),
    total_turnover: zod.number(),
    total_tax_paid: zod.number(),
    total_input_tax_credit: zod.number(),
    audit_status: zod.enum(["Draft", "Filed", "Final"]),
    auditor_name: zod.string()
});

// Create GST audit report
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = gstAuditReportSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const reportData = {
            ...validation.data,
            report_id: `GSTR-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const report = new GSTAuditReport(reportData);
        await report.save();

        res.status(201).json({
            message: "GST audit report created successfully",
            data: report,
        });
    } catch (error) {
        console.error("Create GST Audit Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all GST audit reports with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const reports = await GSTAuditReport.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await GSTAuditReport.countDocuments();

        res.json({
            data: reports,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get GST Audit Reports Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get GST audit report by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const report = await GSTAuditReport.findOne({
            report_id: req.params.id,
        });

        if (!report) {
            return res.status(404).json({ message: "GST audit report not found" });
        }

        res.json({ data: report });
    } catch (error) {
        console.error("Get GST Audit Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update GST audit report
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = gstAuditReportSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const report = await GSTAuditReport.findOneAndUpdate(
            { report_id: req.params.id },
            {
                ...validation.data,
                last_updated: new Date(),
            },
            { new: true }
        );

        if (!report) {
            return res.status(404).json({ message: "GST audit report not found" });
        }

        res.json({
            message: "GST audit report updated successfully",
            data: report,
        });
    } catch (error) {
        console.error("Update GST Audit Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete GST audit report
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const report = await GSTAuditReport.findOneAndDelete({
            report_id: req.params.id,
        });

        if (!report) {
            return res.status(404).json({ message: "GST audit report not found" });
        }

        res.json({
            message: "GST audit report deleted successfully",
            data: report,
        });
    } catch (error) {
        console.error("Delete GST Audit Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;