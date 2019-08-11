const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Rating = mongoose.model('Rating', new mongoose.Schema({
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',
        required: true,
    }
}), 'Ratings');

const validateRating = (rating) => {
    const schema = {
        rating: Joi.number().min(0).max(5),
        user: Joi.required(),
        restaurant: Joi.required()
    };
    return Joi.validate(rating, schema);
}
 
exports.Rating = Rating;
exports.validate = validateRating;


