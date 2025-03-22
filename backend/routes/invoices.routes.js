const express = require('express');
const router = express.Router();
const { validateRequest } = require('../middleware');
const { authMiddleware } = require('../middleware');
const zod = require('zod');
const mongoose = require('mongoose');

// Invoice Schema
const invoiceSchema = new mongoose.Schema({
    invoice_id: { type: String, required: true, unique: true },
    order_id: { type: String, required: true },
    customer_id: { type: String, required: true },
    invoice_date: { type: Date, required: true },
    due_date: { type: Date, required: true },
    payment_status: { type: String, required: true },
    total_amount: { type: Number, required: true },
    tax_amount: { type: Number, required: true },
    shipping_amount: { type: Number, required: true },
    grand_total: { type: Number, required: true },
    eway_bill_number: { type: String, required: true },
    created_by: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

// Validation Schema
const invoiceValidationSchema = zod.object({
    order_id: zod.string(),
    customer_id: zod.string(),
    invoice_date: zod.string().datetime(),
    due_date: zod.string().datetime(),
    payment_status: zod.enum(['Pending', 'Completed', 'Cancelled']),
    total_amount: zod.number(),
    tax_amount: zod.number(),
    shipping_amount: zod.number(),
    grand_total: zod.number(),
    eway_bill_number: zod.string(),
    created_by: zod.string()
});

// Create invoice
router.post('/', authMiddleware, validateRequest(invoiceValidationSchema), async (req, res) => {
    try {
        const invoiceData = {
            ...req.body,
            invoice_id: `INV${Math.floor(Math.random() * 10000000)}`,
            created_date: new Date(),
            last_updated: new Date()
        };

        const invoice = new Invoice(invoiceData);
        await invoice.save();

        res.status(201).json({
            success: true,
            data: invoice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all invoices with pagination and filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.payment_status) filter.payment_status = req.query.payment_status;
        if (req.query.customer_id) filter.customer_id = req.query.customer_id;
        if (req.query.order_id) filter.order_id = req.query.order_id;

        const invoices = await Invoice.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await Invoice.countDocuments(filter);

        res.json({
            success: true,
            data: invoices,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get invoice by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ invoice_id: req.params.id });
        if (!invoice) {
            return res.status(404).json({
                success: false,
                error: 'Invoice not found'
            });
        }

        res.json({
            success: true,
            data: invoice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update invoice
router.put('/:id', authMiddleware, validateRequest(invoiceValidationSchema), async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ invoice_id: req.params.id });
        if (!invoice) {
            return res.status(404).json({
                success: false,
                error: 'Invoice not found'
            });
        }

        const updatedInvoice = await Invoice.findOneAndUpdate(
            { invoice_id: req.params.id },
            {
                ...req.body,
                last_updated: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedInvoice
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete invoice
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const invoice = await Invoice.findOne({ invoice_id: req.params.id });
        if (!invoice) {
            return res.status(404).json({
                success: false,
                error: 'Invoice not found'
            });
        }

        await Invoice.findOneAndDelete({ invoice_id: req.params.id });

        res.json({
            success: true,
            message: 'Invoice deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;