const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    setup: {
        type: String,
        required: [true, 'Setup is required!']
    }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;