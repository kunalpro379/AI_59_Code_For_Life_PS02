const express = require('express');
const router = express.Router();
const { SalesOrder, salesOrderValidationSchema } = require('../schemas/sales_orders.schema');
const { validateRequest } = require('../middleware');
const { authMiddleware } = require('../middleware');

// Create a new sales order
router.post('/', authMiddleware, validateRequest(salesOrderValidationSchema), async (req, res) => {
    try {
        const salesOrderData = {
            ...req.body,
            order_id: `SO${Math.floor(Math.random() * 10000000)}`,
            created_date: new Date(),
            last_updated: new Date()
        };

        const salesOrder = new SalesOrder(salesOrderData);
        await salesOrder.save();

        res.status(201).json({
            success: true,
            data: salesOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all sales orders with pagination and filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.order_status) filter.order_status = req.query.order_status;
        if (req.query.payment_status) filter.payment_status = req.query.payment_status;
        if (req.query.customer_id) filter.customer_id = req.query.customer_id;

        const salesOrders = await SalesOrder.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await SalesOrder.countDocuments(filter);

        res.json({
            success: true,
            data: salesOrders,
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

// Get a specific sales order by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const salesOrder = await SalesOrder.findOne({ order_id: req.params.id });
        if (!salesOrder) {
            return res.status(404).json({
                success: false,
                error: 'Sales order not found'
            });
        }

        res.json({
            success: true,
            data: salesOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update a sales order
router.put('/:id', authMiddleware, validateRequest(salesOrderValidationSchema), async (req, res) => {
    try {
        const salesOrder = await SalesOrder.findOne({ order_id: req.params.id });
        if (!salesOrder) {
            return res.status(404).json({
                success: false,
                error: 'Sales order not found'
            });
        }

        const updatedSalesOrder = await SalesOrder.findOneAndUpdate(
            { order_id: req.params.id },
            {
                ...req.body,
                last_updated: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedSalesOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete a sales order
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const salesOrder = await SalesOrder.findOne({ order_id: req.params.id });
        if (!salesOrder) {
            return res.status(404).json({
                success: false,
                error: 'Sales order not found'
            });
        }

        await SalesOrder.findOneAndDelete({ order_id: req.params.id });

        res.json({
            success: true,
            message: 'Sales order deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;