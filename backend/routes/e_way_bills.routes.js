const express = require('express');
const router = express.Router();
const { EWayBill, eWayBillValidationSchema } = require('../schemas/e_way_bills.schema');
const { validateRequest } = require('../middleware');
const { authMiddleware } = require('../middleware');

// Create a new e-way bill
router.post('/', authMiddleware, validateRequest(eWayBillValidationSchema), async (req, res) => {
    try {
        const eWayBillData = {
            ...req.body,
            eway_bill_id: `EWB${Math.floor(Math.random() * 10000000)}`,
            created_date: new Date(),
            last_updated: new Date()
        };

        const eWayBill = new EWayBill(eWayBillData);
        await eWayBill.save();

        res.status(201).json({
            success: true,
            data: eWayBill
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all e-way bills with pagination and filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.from_gstin) filter.from_gstin = req.query.from_gstin;
        if (req.query.to_gstin) filter.to_gstin = req.query.to_gstin;

        const eWayBills = await EWayBill.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await EWayBill.countDocuments(filter);

        res.json({
            success: true,
            data: eWayBills,
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

// Get a specific e-way bill by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const eWayBill = await EWayBill.findOne({ eway_bill_id: req.params.id });
        if (!eWayBill) {
            return res.status(404).json({
                success: false,
                error: 'E-way bill not found'
            });
        }

        res.json({
            success: true,
            data: eWayBill
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update an e-way bill
router.put('/:id', authMiddleware, validateRequest(eWayBillValidationSchema), async (req, res) => {
    try {
        const eWayBill = await EWayBill.findOne({ eway_bill_id: req.params.id });
        if (!eWayBill) {
            return res.status(404).json({
                success: false,
                error: 'E-way bill not found'
            });
        }

        const updatedEWayBill = await EWayBill.findOneAndUpdate(
            { eway_bill_id: req.params.id },
            {
                ...req.body,
                last_updated: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedEWayBill
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete an e-way bill
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const eWayBill = await EWayBill.findOne({ eway_bill_id: req.params.id });
        if (!eWayBill) {
            return res.status(404).json({
                success: false,
                error: 'E-way bill not found'
            });
        }

        await EWayBill.findOneAndDelete({ eway_bill_id: req.params.id });

        res.json({
            success: true,
            message: 'E-way bill deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;