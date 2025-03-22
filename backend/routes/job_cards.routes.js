
const express = require('express');
const router = express.Router();
const { JobCard, jobCardValidationSchema } = require('../schemas/job_cards.schema');
const { validateRequest } = require('../middleware');
const { authMiddleware } = require('../middleware');

// Create a new job card
router.post('/', authMiddleware, validateRequest(jobCardValidationSchema), async (req, res) => {
    try {
        const jobCardData = {
            ...req.body,
            job_card_id: `JC${Math.floor(Math.random() * 10000000)}`,
            created_date: new Date(),
            last_updated: new Date()
        };

        const jobCard = new JobCard(jobCardData);
        await jobCard.save();

        res.status(201).json({
            success: true,
            data: jobCard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Get all job cards with pagination and filtering
router.get('/', authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const filter = {};
        if (req.query.status) filter.status = req.query.status;
        if (req.query.quality_status) filter.quality_status = req.query.quality_status;
        if (req.query.work_order_id) filter.work_order_id = req.query.work_order_id;

        const jobCards = await JobCard.find(filter)
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await JobCard.countDocuments(filter);

        res.json({
            success: true,
            data: jobCards,
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

// Get a specific job card by ID
router.get('/:id', authMiddleware, async (req, res) => {
    try {
        const jobCard = await JobCard.findOne({ job_card_id: req.params.id });
        if (!jobCard) {
            return res.status(404).json({
                success: false,
                error: 'Job card not found'
            });
        }

        res.json({
            success: true,
            data: jobCard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Update a job card
router.put('/:id', authMiddleware, validateRequest(jobCardValidationSchema), async (req, res) => {
    try {
        const jobCard = await JobCard.findOne({ job_card_id: req.params.id });
        if (!jobCard) {
            return res.status(404).json({
                success: false,
                error: 'Job card not found'
            });
        }

        const updatedJobCard = await JobCard.findOneAndUpdate(
            { job_card_id: req.params.id },
            {
                ...req.body,
                last_updated: new Date()
            },
            { new: true }
        );

        res.json({
            success: true,
            data: updatedJobCard
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Delete a job card
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const jobCard = await JobCard.findOne({ job_card_id: req.params.id });
        if (!jobCard) {
            return res.status(404).json({
                success: false,
                error: 'Job card not found'
            });
        }

        await JobCard.findOneAndDelete({ job_card_id: req.params.id });

        res.json({
            success: true,
            message: 'Job card deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;