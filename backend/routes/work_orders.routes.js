const express = require('express');
const router = express.Router();
const { WorkOrder, workOrderValidationSchema } = require('../schemas/work_orders.schema');
const { validateRequest } = require('../middleware');
const { authMiddleware } = require('../middleware');

// Create a new work order
router.post('/', authMiddleware, validateRequest(workOrderValidationSchema), async (req, res) => {
    try {
        const workOrderData = {
            ...req.body,
            work_order_id: `WO${Math.floor(Math.random() * 10000000)}`,
            created_date: new Date(),
            last_updated: new Date()
        };

        const workOrder = new WorkOrder(workOrderData);
        await workOrder.save();

        res.status(201).json({
            success: true,
            data: workOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all work orders with pagination and filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.priority) filter.priority = req.query.priority;
        if (req.query.batch_id) filter.batch_id = req.query.batch_id;

        const workOrders = await WorkOrder.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await WorkOrder.countDocuments(filter);

        res.json({
            success: true,
            data: workOrders,
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

// Get a specific work order by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const workOrder = await WorkOrder.findOne({ work_order_id: req.params.id });
        if (!workOrder) {
            return res.status(404).json({
                success: false,
                error: 'Work order not found'
            });
        }

        res.json({
            success: true,
            data: workOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update a work order
router.put('/:id', authMiddleware, validateRequest(workOrderValidationSchema), async (req, res) => {
    try {
        const workOrder = await WorkOrder.findOne({ work_order_id: req.params.id });
        if (!workOrder) {
            return res.status(404).json({
                success: false,
                error: 'Work order not found'
            });
        }

        const updatedWorkOrder = await WorkOrder.findOneAndUpdate(
            { work_order_id: req.params.id },
            {
                ...req.body,
                last_updated: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedWorkOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete a work order
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const workOrder = await WorkOrder.findOne({ work_order_id: req.params.id });
        if (!workOrder) {
            return res.status(404).json({
                success: false,
                error: 'Work order not found'
            });
        }

        await WorkOrder.findOneAndDelete({ work_order_id: req.params.id });

        res.json({
            success: true,
            message: 'Work order deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;