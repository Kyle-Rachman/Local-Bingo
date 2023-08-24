const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
    .then(hash => {
        this.password = hash;
        next();
    });
});

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastInitial: {
        type: String,
        required: [true, "Last name is required"],
        maxLength: [2, "Just the initial! You can add another character to help distinguish people if necessary."]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    }
}, {timestamps: true});


UserSchema.virtual('confirmPassword')
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Password must match confirm password');
    }
    next();
});

const User = mongoose.model('User', UserSchema);
module.exports = User;