const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { PaymentProcessing } = require("../schemas/payment_processing.schema");
const zod = require("zod");

// Validation schema
const paymentProcessingSchema = zod.object({
    reference_id: zod.string(),
    payment_date: zod.string().transform((str) => new Date(str)),
    amount: zod.number(),
    payment_mode: zod.string(),
    payment_type: zod.string(),
    account_id: zod.string(),
    status: zod.enum(["Pending", "Completed", "Failed", "Cancelled"]).default("Pending"),
    remarks: zod.string().optional(),
    created_by: zod.string(),
});

// Create payment processing record
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = paymentProcessingSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const paymentData = {
            ...validation.data,
            payment_id: `PAY-${Date.now()}`,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const payment = new PaymentProcessing(paymentData);
        await payment.save();

        res.status(201).json({
            message: "Payment processing record created successfully",
            data: payment,
        });
    } catch (error) {
        console.error("Create Payment Processing Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all payment processing records with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const payments = await PaymentProcessing.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await PaymentProcessing.countDocuments();

        res.json({
            data: payments,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get Payment Processing Records Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get payment processing record by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const payment = await PaymentProcessing.findOne({
            payment_id: req.params.id,
        });

        if (!payment) {
            return res.status(404).json({ message: "Payment processing record not found" });
        }

        res.json({ data: payment });
    } catch (error) {
        console.error("Get Payment Processing Record Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update payment processing record
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = paymentProcessingSchema.safeParse(req.body);
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

        const payment = await PaymentProcessing.findOneAndUpdate(
            { payment_id: req.params.id },
            updateData,
            { new: true }
        );

        if (!payment) {
            return res.status(404).json({ message: "Payment processing record not found" });
        }

        res.json({
            message: "Payment processing record updated successfully",
            data: payment,
        });
    } catch (error) {
        console.error("Update Payment Processing Record Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete payment processing record
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const payment = await PaymentProcessing.findOneAndDelete({
            payment_id: req.params.id,
        });

        if (!payment) {
            return res.status(404).json({ message: "Payment processing record not found" });
        }

        res.json({
            message: "Payment processing record deleted successfully",
            data: payment,
        });
    } catch (error) {
        console.error("Delete Payment Processing Record Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;