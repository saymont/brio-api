const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    active: Boolean,
    name: String,
    email: String,
    password: String,
    cpf: String,
    profile: String,
    password_changed_in: Date,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    psychologists_treatment: Array,
    last_passwords: Array,
    psychologist: {
        crp: String,
        approved: Boolean,
        approved_in: Date
    }
});

module.exports = mongoose.model("User", UserSchema);
