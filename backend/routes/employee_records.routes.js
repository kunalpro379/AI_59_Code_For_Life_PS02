const express = require('express');
const router = express.Router();
const { validateRequest } = require('../middleware');
const { authMiddleware } = require('../middleware');
const zod = require('zod');
const mongoose = require('mongoose');

// Employee Record Schema
const employeeSchema = new mongoose.Schema({
    employee_id: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date_of_birth: { type: Date, required: true },
    gender: { type: String, required: true },
    address: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    join_date: { type: Date, required: true },
    employment_type: { type: String, required: true },
    status: { type: String, required: true },
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const EmployeeRecord = mongoose.model('EmployeeRecord', employeeSchema);

// Validation Schema
const employeeValidationSchema = zod.object({
    first_name: zod.string(),
    last_name: zod.string(),
    email: zod.string().email(),
    phone: zod.string(),
    date_of_birth: zod.string().datetime(),
    gender: zod.enum(['Male', 'Female', 'Other']),
    address: zod.string(),
    department: zod.string(),
    designation: zod.string(),
    join_date: zod.string().datetime(),
    employment_type: zod.enum(['Permanent', 'Temporary', 'Contract']),
    status: zod.enum(['Active', 'Inactive', 'Terminated'])
});

// Create employee record
router.post('/', authMiddleware, validateRequest(employeeValidationSchema), async (req, res) => {
    try {
        const employeeData = {
            ...req.body,
            employee_id: `EMP${Math.floor(Math.random() * 1000000)}`,
            created_date: new Date(),
            last_updated: new Date()
        };

        const employee = new EmployeeRecord(employeeData);
        await employee.save();

        res.status(201).json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all employee records with pagination and filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.department) filter.department = req.query.department;
        if (req.query.status) filter.status = req.query.status;
        if (req.query.employment_type) filter.employment_type = req.query.employment_type;

        const employees = await EmployeeRecord.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await EmployeeRecord.countDocuments(filter);

        res.json({
            success: true,
            data: employees,
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

// Get employee record by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const employee = await EmployeeRecord.findOne({ employee_id: req.params.id });
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee record not found'
            });
        }

        res.json({
            success: true,
            data: employee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update employee record
router.put('/:id', authMiddleware, validateRequest(employeeValidationSchema), async (req, res) => {
    try {
        const employee = await EmployeeRecord.findOne({ employee_id: req.params.id });
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee record not found'
            });
        }

        const updatedEmployee = await EmployeeRecord.findOneAndUpdate(
            { employee_id: req.params.id },
            {
                ...req.body,
                last_updated: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedEmployee
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete employee record
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const employee = await EmployeeRecord.findOne({ employee_id: req.params.id });
        if (!employee) {
            return res.status(404).json({
                success: false,
                error: 'Employee record not found'
            });
        }

        await EmployeeRecord.findOneAndDelete({ employee_id: req.params.id });

        res.json({
            success: true,
            message: 'Employee record deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;