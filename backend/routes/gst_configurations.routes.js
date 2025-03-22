const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { GSTConfiguration } = require("../schemas/gst_configurations.schema");
const zod = require("zod");

// Validation schema
const gstConfigurationSchema = zod.object({
    gstin: zod.string(),
    business_name: zod.string(),
    business_address: zod.string(),
    state_code: zod.string(),
    tax_payer_type: zod.enum(["Regular", "Composition", "ISD", "TDS", "TCS"]),
    registration_date: zod.string().transform((str) => new Date(str)),
    default_tax_rate: zod.number(),
    filing_frequency: zod.enum(["Monthly", "Quarterly", "Annually"]),
    auto_generate_einvoice: zod.boolean().default(false),
    auto_generate_eway: zod.boolean().default(false),
    status: zod.enum(["Active", "Inactive"]).default("Active")
});

// Create GST configuration
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = gstConfigurationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const configData = {
            ...validation.data,
            config_id: `GSTC-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const config = new GSTConfiguration(configData);
        await config.save();

        res.status(201).json({
            message: "GST configuration created successfully",
            data: config,
        });
    } catch (error) {
        console.error("Create GST Configuration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all GST configurations with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const configs = await GSTConfiguration.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await GSTConfiguration.countDocuments();

        res.json({
            data: configs,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get GST Configurations Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get GST configuration by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const config = await GSTConfiguration.findOne({
            config_id: req.params.id,
        });

        if (!config) {
            return res.status(404).json({ message: "GST configuration not found" });
        }

        res.json({ data: config });
    } catch (error) {
        console.error("Get GST Configuration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update GST configuration
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = gstConfigurationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const config = await GSTConfiguration.findOneAndUpdate(
            { config_id: req.params.id },
            {
                ...validation.data,
                last_updated: new Date(),
            },
            { new: true }
        );

        if (!config) {
            return res.status(404).json({ message: "GST configuration not found" });
        }

        res.json({
            message: "GST configuration updated successfully",
            data: config,
        });
    } catch (error) {
        console.error("Update GST Configuration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete GST configuration
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const config = await GSTConfiguration.findOneAndDelete({
            config_id: req.params.id,
        });

        if (!config) {
            return res.status(404).json({ message: "GST configuration not found" });
        }

        res.json({
            message: "GST configuration deleted successfully",
            data: config,
        });
    } catch (error) {
        console.error("Delete GST Configuration Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;