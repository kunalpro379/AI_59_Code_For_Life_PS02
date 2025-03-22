const mongoose = require('mongoose');
const zod = require('zod');

const dialogueSchema = new mongoose.Schema({
    turn: { type: Number, required: true },
    query: { type: String, required: true },
    response: { type: String, required: true },
    timestamp: { type: Date, required: true }
});

const conversationSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    module: { type: String, required: true },
    category: { type: String, required: true },
    user_role: { type: String, required: true },
    dialogue: [dialogueSchema],
    created_date: { type: Date, default: Date.now },
    last_updated: { type: Date, default: Date.now }
});

const Conversation = mongoose.model('Conversation', conversationSchema);

const conversationValidationSchema = zod.object({
    module: zod.string(),
    category: zod.string(),
    user_role: zod.string(),
    dialogue: zod.array(zod.object({
        turn: zod.number(),
        query: zod.string(),
        response: zod.string(),
        timestamp: zod.string().datetime()
    }))
});

module.exports = {
    Conversation,
    conversationValidationSchema
};