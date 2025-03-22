const express = require('express');
const router = express.Router();
const { SalesRegister, salesRegisterValidationSchema } = require('../schemas/sales_register.schema');
const { validateRequest } = require('../middleware');
const { authMiddleware } = require('../middleware');

// Create a new sales record
router.post('/', authMiddleware, validateRequest(salesRegisterValidationSchema), async (req, res) => {
    try {
        const salesData = {
            ...req.body,
            sale_id: `SALE${Math.floor(Math.random() * 10000000)}`,
            created_date: new Date(),
            last_updated: new Date()
        };

        const sale = new SalesRegister(salesData);
        await sale.save();

        res.status(201).json({
            success: true,
            data: sale
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all sales records with pagination and filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.payment_status) filter.payment_status = req.query.payment_status;
        if (req.query.customer_id) filter.customer_id = req.query.customer_id;
        if (req.query.order_id) filter.order_id = req.query.order_id;

        const sales = await SalesRegister.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await SalesRegister.countDocuments(filter);

        res.json({
            success: true,
            data: sales,
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

// Get a specific sales record by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const sale = await SalesRegister.findOne({ sale_id: req.params.id });
        if (!sale) {
            return res.status(404).json({
                success: false,
                error: 'Sales record not found'
            });
        }

        res.json({
            success: true,
            data: sale
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update a sales record
router.put('/:id', authMiddleware, validateRequest(salesRegisterValidationSchema), async (req, res) => {
    try {
        const sale = await SalesRegister.findOne({ sale_id: req.params.id });
        if (!sale) {
            return res.status(404).json({
                success: false,
                error: 'Sales record not found'
            });
        }

        const updatedSale = await SalesRegister.findOneAndUpdate(
            { sale_id: req.params.id },
            {
                ...req.body,
                last_updated: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedSale
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete a sales record
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const sale = await SalesRegister.findOne({ sale_id: req.params.id });
        if (!sale) {
            return res.status(404).json({
                success: false,
                error: 'Sales record not found'
            });
        }

        await SalesRegister.findOneAndDelete({ sale_id: req.params.id });

        res.json({
            success: true,
            message: 'Sales record deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;