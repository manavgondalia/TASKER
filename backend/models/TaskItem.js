const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const taskItemSchema = new Schema({
    taskdetail: {
        type: String,
        required: true
    },
    dateofcreation: {
        type: Date,
        required: true,
        default: Date()
    },
    completed: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model("Taskitem", taskItemSchema);