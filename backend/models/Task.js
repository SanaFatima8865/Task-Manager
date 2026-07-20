const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxLength: [100, 'Title too long']
    },
    completed: {
        type: Boolean,
        default: false
    },
    priority: {
        type: String,
        default: 'medium',
        enum: ['low', 'medium', 'high']
    }, owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model('Task', taskSchema);