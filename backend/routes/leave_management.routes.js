const express = require('express');
const router = express.Router();
const { LeaveManagement, leaveManagementValidationSchema } = require('../schemas/leave_management.schema');
const { validateRequest } = require('../middleware');
const { authMiddleware } = require('../middleware');

// Create a new leave request
router.post('/', authMiddleware, validateRequest(leaveManagementValidationSchema), async (req, res) => {
    try {
        const leaveData = {
            ...req.body,
            leave_id: `LEV${Math.floor(Math.random() * 10000000)}`,
            created_date: new Date(),
            last_updated: new Date(),
            status: 'Pending'
        };

        const leave = new LeaveManagement(leaveData);
        await leave.save();

        res.status(201).json({
            success: true,
            data: leave
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all leave requests with pagination and filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.employee_id) filter.employee_id = req.query.employee_id;

        const leaves = await LeaveManagement.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await LeaveManagement.countDocuments(filter);

        res.json({
            success: true,
            data: leaves,
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

// Get a specific leave request by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const leave = await LeaveManagement.findOne({ leave_id: req.params.id });
        if (!leave) {
            return res.status(404).json({
                success: false,
                error: 'Leave request not found'
            });
        }

        res.json({
            success: true,
            data: leave
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update a leave request
router.put('/:id', authMiddleware, validateRequest(leaveManagementValidationSchema), async (req, res) => {
    try {
        const leave = await LeaveManagement.findOne({ leave_id: req.params.id });
        if (!leave) {
            return res.status(404).json({
                success: false,
                error: 'Leave request not found'
            });
        }

        const updatedLeave = await LeaveManagement.findOneAndUpdate(
            { leave_id: req.params.id },
            {
                ...req.body,
                last_updated: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedLeave
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete a leave request
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const leave = await LeaveManagement.findOne({ leave_id: req.params.id });
        if (!leave) {
            return res.status(404).json({
                success: false,
                error: 'Leave request not found'
            });
        }

        await LeaveManagement.findOneAndDelete({ leave_id: req.params.id });

        res.json({
            success: true,
            message: 'Leave request deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;