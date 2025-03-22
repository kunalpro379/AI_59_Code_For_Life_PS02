const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { PayrollReport } = require("../schemas/payroll_reports.schema");
const zod = require("zod");

// Validation schema
const payrollReportSchema = zod.object({
    employee_id: zod.string(),
    employee_name: zod.string(),
    pay_period: zod.string(),
    basic_salary: zod.number(),
    allowances: zod.number(),
    deductions: zod.number(),
    net_salary: zod.number(),
    payment_status: zod.enum(["Pending", "Processed", "Paid"]).default("Pending"),
    payment_date: zod.string().transform((str) => new Date(str)).optional(),
    remarks: zod.string().optional(),
});

// Create payroll report
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = payrollReportSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const payrollData = {
            ...validation.data,
            report_id: `PAY-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const payrollReport = new PayrollReport(payrollData);
        await payrollReport.save();

        res.status(201).json({
            message: "Payroll report created successfully",
            data: payrollReport,
        });
    } catch (error) {
        console.error("Create Payroll Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all payroll reports with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const payrollReports = await PayrollReport.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await PayrollReport.countDocuments();

        res.json({
            data: payrollReports,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get Payroll Reports Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get payroll report by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const payrollReport = await PayrollReport.findOne({
            report_id: req.params.id,
        });

        if (!payrollReport) {
            return res.status(404).json({ message: "Payroll report not found" });
        }

        res.json({ data: payrollReport });
    } catch (error) {
        console.error("Get Payroll Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update payroll report
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = payrollReportSchema.safeParse(req.body);
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

        const payrollReport = await PayrollReport.findOneAndUpdate(
            { report_id: req.params.id },
            updateData,
            { new: true }
        );

        if (!payrollReport) {
            return res.status(404).json({ message: "Payroll report not found" });
        }

        res.json({
            message: "Payroll report updated successfully",
            data: payrollReport,
        });
    } catch (error) {
        console.error("Update Payroll Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete payroll report
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const payrollReport = await PayrollReport.findOneAndDelete({
            report_id: req.params.id,
        });

        if (!payrollReport) {
            return res.status(404).json({ message: "Payroll report not found" });
        }

        res.json({
            message: "Payroll report deleted successfully",
            data: payrollReport,
        });
    } catch (error) {
        console.error("Delete Payroll Report Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;