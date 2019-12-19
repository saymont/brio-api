const mongoose = require('mongoose');

// const Schema = mongoose.Schema, ObjectId = Schema.ObjectId;

const UserSchema = new mongoose.Schema({
    administrator: Boolean,
    active: Boolean,
    name: String,
    email: String,
    password: String,
    cpf: String,
    psychologist: {
        crp: String,
        approvedBy: mongoose.Schema.ObjectId
    }
})

module.exports = mongoose.model('User', UserSchema);