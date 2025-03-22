const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware");
const { StandardSpecification } = require("../schemas/standard_specifications.schema");
const zod = require("zod");

// Validation schema
const parameterSchema = zod.object({
    parameter_id: zod.string(),
    parameter_name: zod.string(),
    unit: zod.string(),
    min_value: zod.number(),
    max_value: zod.number(),
    target_value: zod.number()
});

const standardSpecificationSchema = zod.object({
    specification_code: zod.string(),
    specification_name: zod.string(),
    category: zod.string(),
    description: zod.string(),
    parameters: zod.array(parameterSchema),
    status: zod.enum(["Active", "Inactive"]).default("Active")
});

// Create standard specification
router.post("/", authMiddleware, async (req, res) => {
    try {
        const validation = standardSpecificationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const specificationData = {
            ...validation.data,
            specification_id: `SPEC-${Date.now()}`,
            created_by: req.userId,
            created_date: new Date(),
            last_updated: new Date(),
        };

        const specification = new StandardSpecification(specificationData);
        await specification.save();

        res.status(201).json({
            message: "Standard specification created successfully",
            data: specification,
        });
    } catch (error) {
        console.error("Create Standard Specification Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get all standard specifications with pagination
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const specifications = await StandardSpecification.find()
            .skip(skip)
            .limit(limit)
            .sort({ created_date: -1 });

        const total = await StandardSpecification.countDocuments();

        res.json({
            data: specifications,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Get Standard Specifications Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Get standard specification by ID
router.get("/:id", authMiddleware, async (req, res) => {
    try {
        const specification = await StandardSpecification.findOne({
            specification_id: req.params.id,
        });

        if (!specification) {
            return res.status(404).json({ message: "Standard specification not found" });
        }

        res.json({ data: specification });
    } catch (error) {
        console.error("Get Standard Specification Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Update standard specification
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const validation = standardSpecificationSchema.safeParse(req.body);
        if (!validation.success) {
            return res.status(400).json({
                message: "Invalid input data",
                errors: validation.error.errors,
            });
        }

        const updateData = {
            ...validation.data,
            last_updated: new Date(),
        };

        const specification = await StandardSpecification.findOneAndUpdate(
            { specification_id: req.params.id },
            updateData,
            { new: true }
        );

        if (!specification) {
            return res.status(404).json({ message: "Standard specification not found" });
        }

        res.json({
            message: "Standard specification updated successfully",
            data: specification,
        });
    } catch (error) {
        console.error("Update Standard Specification Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Delete standard specification
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const specification = await StandardSpecification.findOneAndDelete({
            specification_id: req.params.id,
        });

        if (!specification) {
            return res.status(404).json({ message: "Standard specification not found" });
        }

        res.json({
            message: "Standard specification deleted successfully",
            data: specification,
        });
    } catch (error) {
        console.error("Delete Standard Specification Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;