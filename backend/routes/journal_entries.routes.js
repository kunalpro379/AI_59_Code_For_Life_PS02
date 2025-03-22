const express = require("express");
const router = express.Router();
const { JournalEntries } = require("../schemas/journal_entries.schema");
const { validateRequest } = require("../middleware");
const { z } = require("zod");

// Validation schemas
const entrySchema = z.object({
    account_id: z.string(),
    debit_amount: z.number().min(0),
    credit_amount: z.number().min(0),
    description: z.string()
});

const journalEntrySchema = z.object({
    entry_date: z.string().transform(str => new Date(str)),
    reference: z.string(),
    description: z.string(),
    entries: z.array(entrySchema),
    total_debit: z.number().min(0),
    total_credit: z.number().min(0),
    status: z.enum(["Draft", "Posted", "Cancelled"]),
    created_by: z.string()
});

// Get all journal entries with pagination
router.get("/", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const entries = await JournalEntries.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await JournalEntries.countDocuments();

        res.json({
            data: entries,
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

// Get journal entry by ID
router.get("/:id", async (req, res) => {
    try {
        const entry = await JournalEntries.findOne({ entry_id: req.params.id });
        if (!entry) {
            return res.status(404).json({ error: "Journal entry not found" });
        }
        res.json(entry);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create new journal entry
router.post("/", validateRequest(journalEntrySchema), async (req, res) => {
    try {
        const entry = new JournalEntries({
            entry_id: `JRN${Math.floor(Math.random() * 100000000).toString().padStart(8, '0')}`,
            ...req.body,
            created_date: new Date(),
            last_updated: new Date()
        });
        await entry.save();
        res.status(201).json(entry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update journal entry
router.put("/:id", validateRequest(journalEntrySchema), async (req, res) => {
    try {
        const entry = await JournalEntries.findOneAndUpdate(
            { entry_id: req.params.id },
            { ...req.body, last_updated: new Date() },
            { new: true }
        );
        if (!entry) {
            return res.status(404).json({ error: "Journal entry not found" });
        }
        res.json(entry);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Delete journal entry
router.delete("/:id", async (req, res) => {
    try {
        const entry = await JournalEntries.findOneAndDelete({ entry_id: req.params.id });
        if (!entry) {
            return res.status(404).json({ error: "Journal entry not found" });
        }
        res.json({ message: "Journal entry deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;