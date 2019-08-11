const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const User = mongoose.model('User', new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    lname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
}), 'Users');

const validateUser = (user) => {
    const schema = {
        fname: Joi.string().min(3).max(50).required(),
        lname: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}

const validateLogin = (user) => {
    const schema = {
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(user, schema);
}
 
exports.User = User;
exports.validateUser = validateUser;
exports.validateLogin = validateLogin;


