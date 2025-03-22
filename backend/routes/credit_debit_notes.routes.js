const express = require("express");
const router = express.Router();
const { CreditDebitNotes } = require("../schemas/credit_debit_notes.schema");
const { validateRequest } = require("../middleware");
const { z } = require("zod");

// Validation schemas
const creditDebitNoteSchema = z.object({
    note_number: z.string(),
    invoice_id: z.string(),
    customer_gstin: z.string(),
    note_type: z.enum(["Credit", "Debit"]),
    reason: z.string(),
    taxable_amount: z.number().min(0),
    cgst_amount: z.number().min(0),
    sgst_amount: z.number().min(0),
    igst_amount: z.number().min(0),
    total_amount: z.number().min(0),
    status: z.enum(["Draft", "Posted", "Cancelled"]),
    created_by: z.string()
});

// Get all credit/debit notes with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const notes = await CreditDebitNotes.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await CreditDebitNotes.countDocuments();

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

// Get credit/debit note by ID
router.get("/:id", async (req, res) => {
    try {
        const note = await CreditDebitNotes.findOne({ note_id: req.params.id });
        if (!note) {
            return res.status(404).json({ error: "Credit/Debit note not found" });
        }
        res.json(note);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new credit/debit note
router.post("/", validateRequest(creditDebitNoteSchema), async (req, res) => {
    try {
        const note = new CreditDebitNotes({
            note_id: `CDN${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            note_date: new Date(),
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

// Update credit/debit note
router.put("/:id", validateRequest(creditDebitNoteSchema), async (req, res) => {
    try {
        const note = await CreditDebitNotes.findOneAndUpdate(
            { note_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!note) {
            return res.status(404).json({ error: "Credit/Debit note not found" });
        }
        res.json(note);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete credit/debit note
router.delete("/:id", async (req, res) => {
    try {
        const note = await CreditDebitNotes.findOneAndDelete({ note_id: req.params.id });
        if (!note) {
            return res.status(404).json({ error: "Credit/Debit note not found" });
        }
        res.json({ message: "Credit/Debit note deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;