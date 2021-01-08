const mongoose = require('mongoose');
let User = require('./user.model');

const Schema = mongoose.Schema;

const jobSchema = new Schema({
    tweet: { type: String, required: true },
    tweep_username: { type: String, required: true },
    tweep_screenname: { type: String, required: true },
    status_id: { type: String, required: true },
    date: { type: Date, required: true },
    deadline: { type: Date },
    important: { type: Boolean },
    notes: { type: String },
    user_id: { type: String, required: true }
}, {
    timestamps: true,
})

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
