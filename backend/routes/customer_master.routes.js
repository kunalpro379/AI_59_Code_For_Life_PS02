const express = require('express');
const router = express.Router();
const { CustomerMaster, customerMasterValidationSchema } = require('../schemas/customer_master.schema');
const { validateRequest } = require('../middleware');
const { authMiddleware } = require('../middleware');

// Create a new customer
router.post('/', authMiddleware, validateRequest(customerMasterValidationSchema), async (req, res) => {
    try {
        const customerData = {
            ...req.body,
            customer_id: `CUST${Math.floor(Math.random() * 10000000)}`,
            created_date: new Date(),
            last_updated: new Date()
        };

        const customer = new CustomerMaster(customerData);
        await customer.save();

        res.status(201).json({
            success: true,
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all customers with pagination and filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.city) filter.city = req.query.city;
        if (req.query.state) filter.state = req.query.state;

        const customers = await CustomerMaster.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await CustomerMaster.countDocuments(filter);

        res.json({
            success: true,
            data: customers,
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

// Get a specific customer by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const customer = await CustomerMaster.findOne({ customer_id: req.params.id });
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'Customer not found'
            });
        }

        res.json({
            success: true,
            data: customer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update a customer
router.put('/:id', authMiddleware, validateRequest(customerMasterValidationSchema), async (req, res) => {
    try {
        const customer = await CustomerMaster.findOne({ customer_id: req.params.id });
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'Customer not found'
            });
        }

        const updatedCustomer = await CustomerMaster.findOneAndUpdate(
            { customer_id: req.params.id },
            {
                ...req.body,
                last_updated: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedCustomer
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete a customer
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const customer = await CustomerMaster.findOne({ customer_id: req.params.id });
        if (!customer) {
            return res.status(404).json({
                success: false,
                error: 'Customer not found'
            });
        }

        await CustomerMaster.findOneAndDelete({ customer_id: req.params.id });

        res.json({
            success: true,
            message: 'Customer deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;