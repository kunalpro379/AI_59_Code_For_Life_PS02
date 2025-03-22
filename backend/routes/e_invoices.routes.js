// routes/e_invoices.routes.js
const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { EInvoice } = require("../schemas/e_invoices.schema");
const zod = require("zod");

// Validation schema
const eInvoiceSchema = zod.object({
    invoice_date: zod.string().transform((str) => new Date(str)),
    invoice_number: zod.string(),
    customer_gstin: zod.string(),
    hsn_code: zod.string(),
    taxable_amount: zod.number(),
    cgst_amount: zod.number(),
    sgst_amount: zod.number(),
    igst_amount: zod.number(),
    total_amount: zod.number(),
    irn: zod.string(),
    qr_code: zod.string(),
    status: zod.enum(["Draft", "Generated", "Cancelled", "Amended"]).default("Draft"),
});

// Create e-invoice
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = eInvoiceSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const eInvoiceData = {
            ...validation.data,
            invoice_id: `INV-${Date.now()}`,
            created_by: req.userId,
        };

        const eInvoice = new EInvoice(eInvoiceData);
        await eInvoice.save();

        res.status(201).json({
            message: "E-invoice created successfully",
            data: eInvoice,
        });
    } catch (error) {
        console.error("Create E-invoice Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all e-invoices
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { page = 1, limit = 10, status } = req.query;
        const query = status ? { status } : {};

        const eInvoices = await EInvoice.find(query)
            .skip((page - 1) * limit)
            .limit(parseInt(limit))
            .sort({ created_date: -1 });

        const total = await EInvoice.countDocuments(query);

        res.json({
            data: eInvoices,
            total,
            page: parseInt(page),
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        console.error("Get E-invoices Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get e-invoice by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const eInvoice = await EInvoice.findOne({
            $or: [
                { invoice_id: req.params.id },
                { _id: req.params.id },
            ],
        });

        if (!eInvoice) {
            return res.status(404).json({ message: "E-invoice not found" });
        }

        res.json({ data: eInvoice });
    } catch (error) {
        console.error("Get E-invoice Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update e-invoice
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = eInvoiceSchema.partial().safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const eInvoice = await EInvoice.findOneAndUpdate(
            {
                $or: [
                    { invoice_id: req.params.id },
                    { _id: req.params.id },
                ],
            },
            {
                ...validation.data,
                last_updated: new Date(),
            },
            { new: true }
        );

        if (!eInvoice) {
            return res.status(404).json({ message: "E-invoice not found" });
        }

        res.json({
            message: "E-invoice updated successfully",
            data: eInvoice,
        });
    } catch (error) {
        console.error("Update E-invoice Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete e-invoice
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const eInvoice = await EInvoice.findOneAndDelete({
            $or: [
                { invoice_id: req.params.id },
                { _id: req.params.id },
            ],
        });

        if (!eInvoice) {
            return res.status(404).json({ message: "E-invoice not found" });
        }

        res.json({
            message: "E-invoice deleted successfully",
            data: eInvoice,
        });
    } catch (error) {
        console.error("Delete E-invoice Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;