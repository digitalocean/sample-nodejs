const mongoose = require('mongoose');
const { db } = require('./user.model');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String },
    name: { type: String },
    email: { type: String },
    date: { type: Date }
}, {
    timestamps: true,
})


const User = mongoose.model('User', userSchema);
module.exports = User;