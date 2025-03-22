const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { BatchCard } = require("../schemas/batch_cards.schema");
const zod = require("zod");

// Validation schema
const batchCardSchema = zod.object({
    product_code: zod.string(),
    batch_number: zod.string(),
    start_date: zod.string().datetime(),
    planned_end_date: zod.string().datetime(),
    actual_end_date: zod.string().datetime(),
    planned_quantity: zod.number(),
    actual_quantity: zod.number(),
    status: zod.enum(["In Progress", "Completed", "Cancelled"]).default("In Progress"),
    quality_status: zod.enum(["Pending", "Passed", "Failed"]).default("Pending"),
    remarks: zod.string().optional(),
});

// Create batch card
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = batchCardSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const batchCardData = {
            ...validation.data,
            batch_id: `BATCH-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const batchCard = new BatchCard(batchCardData);
        await batchCard.save();

        res.status(201).json({
            message: "Batch card created successfully",
            data: batchCard,
        });
    } catch (error) {
        console.error("Create Batch Card Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all batch cards with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const batchCards = await BatchCard.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await BatchCard.countDocuments();

        res.json({
            data: batchCards,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get Batch Cards Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get batch card by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const batchCard = await BatchCard.findOne({ batch_id: req.params.id });
        if (!batchCard) {
            return res.status(404).json({ message: "Batch card not found" });
        }
        res.json({ data: batchCard });
    } catch (error) {
        console.error("Get Batch Card Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update batch card
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = batchCardSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const batchCard = await BatchCard.findOne({ batch_id: req.params.id });
        if (!batchCard) {
            return res.status(404).json({ message: "Batch card not found" });
        }

        const updatedBatchCard = await BatchCard.findOneAndUpdate(
            { batch_id: req.params.id },
            {
                ...validation.data,
                last_updated: new Date(),
            },
            { new: true }
        );

        res.json({
            message: "Batch card updated successfully",
            data: updatedBatchCard,
        });
    } catch (error) {
        console.error("Update Batch Card Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete batch card
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const batchCard = await BatchCard.findOne({ batch_id: req.params.id });
        if (!batchCard) {
            return res.status(404).json({ message: "Batch card not found" });
        }

        await BatchCard.findOneAndDelete({ batch_id: req.params.id });

        res.json({ message: "Batch card deleted successfully" });
    } catch (error) {
        console.error("Delete Batch Card Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;