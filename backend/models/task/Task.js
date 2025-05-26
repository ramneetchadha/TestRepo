// models/Task.js
// const mongoose = require('mongoose');

// const taskSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     dueDate: { type: Date, required: true },
//     assignor: { type: String, required: true },
//     assignee: { type: String, required: true },
//     status: { type: String, enum: ['open', 'in progress', 'completed'], default: 'open' },
// });

// module.exports = mongoose.model('Task', taskSchema);


const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    assignor: { type: String, required: true },
    assignee: { type: String, required: true },
    status: { type: String, enum: ['open', 'in progress', 'complete'], default: 'open' },
   // createdAt: { type: Date, default: Date.now },
    duedate : {type: Date, default: Date.now}
});

const getTaskModel = (connection) => {
    return connection.model('Task', taskSchema);
};

module.exports = getTaskModel;