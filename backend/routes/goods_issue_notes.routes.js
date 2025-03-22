const express = require("express");
const router = express.Router();
const { GoodsIssueNotes } = require("../schemas/goods_issue_notes.schema");
const { validateRequest } = require("../middleware");
const { z } = require("zod");

// Validation schemas
const goodsIssueNoteSchema = z.object({
    issue_date: z.date(),
    requisition_number: z.string(),
    department: z.string(),
    purpose: z.enum(["Production", "Testing", "Maintenance", "Research", "Other"]),
    total_quantity: z.number().min(0),
    total_value: z.number().min(0),
    status: z.enum(["Draft", "Pending", "Approved", "Rejected", "Cancelled"]),
    remarks: z.string().optional(),
    created_by: z.string()
});

// Get all goods issue notes with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const notes = await GoodsIssueNotes.find()
            .skip(skip)
            .limit(limit);

        const total = await GoodsIssueNotes.countDocuments();

        res.json({
            data: notes,
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

// Get goods issue note by ID
router.get("/:id", async (req, res) => {
    try {
        const note = await GoodsIssueNotes.findOne({ gin_id: req.params.id });
        if (!note) {
            return res.status(404).json({ error: "Goods issue note not found" });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new goods issue note
router.post("/", validateRequest(goodsIssueNoteSchema), async (req, res) => {
    try {
        const note = new GoodsIssueNotes({
            gin_id: `GIN${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            ...req.body,
            created_date: new Date(),
            last_updated: new Date()
        });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update goods issue note
router.put("/:id", validateRequest(goodsIssueNoteSchema), async (req, res) => {
    try {
        const note = await GoodsIssueNotes.findOneAndUpdate(
            { gin_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ error: "Goods issue note not found" });
        }
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete goods issue note
router.delete("/:id", async (req, res) => {
    try {
        const note = await GoodsIssueNotes.findOneAndDelete({ gin_id: req.params.id });
        if (!note) {
            return res.status(404).json({ error: "Goods issue note not found" });
        }
        res.json({ message: "Goods issue note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;