const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { ProcessDefinition } = require("../schemas/process_definitions.schema");
const zod = require("zod");

// Validation schema
const processDefinitionSchema = zod.object({
    process_code: zod.string(),
    process_name: zod.string(),
    description: zod.string(),
    standard_time_minutes: zod.number(),
    setup_time_minutes: zod.number(),
    cleanup_time_minutes: zod.number(),
    required_skills: zod.array(zod.string()),
    required_tools: zod.array(zod.string()),
    quality_checkpoints: zod.number(),
    temperature_requirements: zod.number().optional(),
    status: zod.enum(["Active", "Inactive"]).default("Active"),
});

// Create process definition
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = processDefinitionSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const processData = {
            ...validation.data,
            process_id: `PROC-${Date.now()}`,
            created_by: req.userId,
        };

        const processDefinition = new ProcessDefinition(processData);
        await processDefinition.save();

        res.status(201).json({
            message: "Process definition created successfully",
            data: processDefinition,
        });
    } catch (error) {
        console.error("Create Process Definition Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all process definitions with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const processDefinitions = await ProcessDefinition.find()
            .skip(skip)
            .limit(limit);

        const total = await ProcessDefinition.countDocuments();

        res.json({
            data: processDefinitions,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get Process Definitions Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get process definition by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const processDefinition = await ProcessDefinition.findOne({
            process_id: req.params.id,
        });

        if (!processDefinition) {
            return res.status(404).json({ message: "Process definition not found" });
        }

        res.json({ data: processDefinition });
    } catch (error) {
        console.error("Get Process Definition Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update process definition
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = processDefinitionSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const processDefinition = await ProcessDefinition.findOneAndUpdate(
            { process_id: req.params.id },
            validation.data,
            { new: true }
        );

        if (!processDefinition) {
            return res.status(404).json({ message: "Process definition not found" });
        }

        res.json({
            message: "Process definition updated successfully",
            data: processDefinition,
        });
    } catch (error) {
        console.error("Update Process Definition Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete process definition
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const processDefinition = await ProcessDefinition.findOneAndDelete({
            process_id: req.params.id,
        });

        if (!processDefinition) {
            return res.status(404).json({ message: "Process definition not found" });
        }

        res.json({
            message: "Process definition deleted successfully",
            data: processDefinition,
        });
    } catch (error) {
        console.error("Delete Process Definition Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;