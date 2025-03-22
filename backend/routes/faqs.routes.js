const express = require("express");
const router = express.Router();
const { z } = require("zod");
const { validateRequest } = require("../middleware");

// Validation schema
const faqSchema = z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
    erp_module: z.string(),
    gst_type: z.string().nullable(),
    transaction_type: z.string(),
    user_role: z.string()
});

// Get all FAQs with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const faqs = await FAQ.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await FAQ.countDocuments();

        res.json({
            data: faqs,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get FAQ by ID
router.get("/:id", async (req, res) => {
    try {
        const faq = await FAQ.findOne({ id: req.params.id });
        if (!faq) {
            return res.status(404).json({ error: "FAQ not found" });
        }
        res.json(faq);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new FAQ
router.post("/", validateRequest(faqSchema), async (req, res) => {
    try {
        const faq = new FAQ({
            id: `FAQ${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
            ...req.body,
            created_date: new Date(),
            last_updated: new Date()
        });
        await faq.save();
        res.status(201).json(faq);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update FAQ
router.put("/:id", validateRequest(faqSchema), async (req, res) => {
    try {
        const faq = await FAQ.findOneAndUpdate(
            { id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!faq) {
            return res.status(404).json({ error: "FAQ not found" });
        }
        res.json(faq);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete FAQ
router.delete("/:id", async (req, res) => {
    try {
        const faq = await FAQ.findOneAndDelete({ id: req.params.id });
        if (!faq) {
            return res.status(404).json({ error: "FAQ not found" });
        }
        res.json({ message: "FAQ deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;