const express = require('express');
const router = express.Router();
const { EmployeeAttendance, employeeAttendanceValidationSchema } = require('../schemas/employee_attendance.schema');
const { validateRequest } = require('../middleware');
const { authMiddleware } = require('../middleware');

// Create a new attendance record
router.post('/', authMiddleware, validateRequest(employeeAttendanceValidationSchema), async (req, res) => {
    try {
        const attendanceData = {
            ...req.body,
            attendance_id: `ATT${Math.floor(Math.random() * 10000000)}`,
            created_date: new Date(),
            last_updated: new Date()
        };

        const attendance = new EmployeeAttendance(attendanceData);
        await attendance.save();

        res.status(201).json({
            success: true,
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all attendance records with pagination and filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.employee_id) filter.employee_id = req.query.employee_id;
        if (req.query.date) filter.date = new Date(req.query.date);

        const attendances = await EmployeeAttendance.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await EmployeeAttendance.countDocuments(filter);

        res.json({
            success: true,
            data: attendances,
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

// Get a specific attendance record by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const attendance = await EmployeeAttendance.findOne({ attendance_id: req.params.id });
        if (!attendance) {
            return res.status(404).json({
                success: false,
                error: 'Attendance record not found'
            });
        }

        res.json({
            success: true,
            data: attendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update an attendance record
router.put('/:id', authMiddleware, validateRequest(employeeAttendanceValidationSchema), async (req, res) => {
    try {
        const attendance = await EmployeeAttendance.findOne({ attendance_id: req.params.id });
        if (!attendance) {
            return res.status(404).json({
                success: false,
                error: 'Attendance record not found'
            });
        }

        const updatedAttendance = await EmployeeAttendance.findOneAndUpdate(
            { attendance_id: req.params.id },
            {
                ...req.body,
                last_updated: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedAttendance
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete an attendance record
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const attendance = await EmployeeAttendance.findOne({ attendance_id: req.params.id });
        if (!attendance) {
            return res.status(404).json({
                success: false,
                error: 'Attendance record not found'
            });
        }

        await EmployeeAttendance.findOneAndDelete({ attendance_id: req.params.id });

        res.json({
            success: true,
            message: 'Attendance record deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;