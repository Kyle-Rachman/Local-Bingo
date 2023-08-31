const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastInitial: {
        type: String,
        required: [true, "Last initial is required"],
        maxLength: [2, "Just the initial! You can add another character to help distinguish people if necessary."]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {timestamps: true});

UserSchema.pre('save', async function(next) {
    try {
        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;
        next();
    } catch (error) {
        return next(error);
    }
});

UserSchema.virtual('confirmPassword')
    .get(function() {
        return this._confirmPassword;
    })
    .set(function(value) {
        this._confirmPassword = value;
    });

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;