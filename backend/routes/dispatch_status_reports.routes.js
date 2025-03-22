const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { DispatchStatusReport } = require("../schemas/dispatch_status_reports.schema");
const zod = require("zod");

// Validation schema
const dispatchStatusReportSchema = zod.object({
    drn_id: zod.string(),
    report_date: zod.string().datetime(),
    current_location: zod.string(),
    current_status: zod.enum(["In Transit", "Delivered", "At Hub", "Out for Delivery"]).default("In Transit"),
    estimated_delivery_date: zod.string().datetime(),
    delay_reason: zod.string().optional(),
    remarks: zod.string().optional(),
    created_by: zod.string(),
});

// Create dispatch status report
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = dispatchStatusReportSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const reportData = {
            ...validation.data,
            report_id: `DSR-${Date.now()}`,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const report = new DispatchStatusReport(reportData);
        await report.save();

        res.status(201).json({
            message: "Dispatch status report created successfully",
            data: report,
        });
    } catch (error) {
        console.error("Create Dispatch Status Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all dispatch status reports with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const reports = await DispatchStatusReport.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await DispatchStatusReport.countDocuments();

        res.json({
            data: reports,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get Dispatch Status Reports Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get dispatch status report by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const report = await DispatchStatusReport.findOne({ report_id: req.params.id });
        if (!report) {
            return res.status(404).json({ message: "Dispatch status report not found" });
        }
        res.json({ data: report });
    } catch (error) {
        console.error("Get Dispatch Status Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update dispatch status report
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = dispatchStatusReportSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const report = await DispatchStatusReport.findOne({ report_id: req.params.id });
        if (!report) {
            return res.status(404).json({ message: "Dispatch status report not found" });
        }

        const updatedReport = await DispatchStatusReport.findOneAndUpdate(
            { report_id: req.params.id },
            {
                ...validation.data,
                last_updated: new Date(),
            },
            { new: true }
        );

        res.json({
            message: "Dispatch status report updated successfully",
            data: updatedReport,
        });
    } catch (error) {
        console.error("Update Dispatch Status Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete dispatch status report
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const report = await DispatchStatusReport.findOne({ report_id: req.params.id });
        if (!report) {
            return res.status(404).json({ message: "Dispatch status report not found" });
        }

        await DispatchStatusReport.findOneAndDelete({ report_id: req.params.id });

        res.json({ message: "Dispatch status report deleted successfully" });
    } catch (error) {
        console.error("Delete Dispatch Status Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;