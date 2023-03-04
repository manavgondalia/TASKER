const TaskItem = require("../models/TaskItem")

const gettasks = async (req, res) => {
    var tasks;
    try {
        tasks = await TaskItem.find();

    } catch (err) {
        console.log(err);
    }
    if (!tasks) {
        return res.status(404).json({ message: "No Tasks Found" })
    }
    return res.status(200).json({ tasks })
}

const addtask = async (req, res) => {
    var task;
    try {
        task = new TaskItem({
            taskdetail: req.body.taskdetail,
            dateofcreation: req.body.dateofcreation,
            completed: req.body.completed
        })
        await task.save();

    } catch (err) {
        console.log(err);
    }
    if (!task) {
        return res.status(404).json({ message: "No Task Created" })
    }
    return res.status(200).json({ task })
}

const gettaskbyid = async (req, res) => {
    const id = req.params.id;
    var task;
    try {
        task = await TaskItem.findById(id);

    } catch (err) {
        console.log(err);
    }
    if (!task) {
        return res.status(404).json({ message: "No Task Found by Given ID." })
    }
    return res.status(200).json({ task })
}

const updatetaskbyid = async (req, res) => {
    const id = req.params.id;
    var task;
    try {
        task = await TaskItem.findById(id);
        task.completed = !task.completed;
        task.save();
    } catch (err) {
        console.log(err);
    }
    if (!task) {
        return res.status(404).json({ message: "No Tasks Found by Given ID to Update." })
    }
    return res.status(200).json({ task })
}

const deletetask = async (req, res) => {
    const id = req.params.id;
    var task;
    try {
        task = await TaskItem.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
    }
    if (!task) {
        return res.status(404).json({ message: "No Tasks Found by Given ID to Delete." })
    }
    return res.status(200).json({ message: "Product deleted." })
}

exports.gettasks = gettasks;
exports.addtask = addtask;
exports.gettaskbyid = gettaskbyid;
exports.updatetaskbyid = updatetaskbyid;
exports.deletetask = deletetask;
