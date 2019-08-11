const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

const Reservation = mongoose.model('Reservation', new mongoose.Schema({
    datetime: {
        type: Date,
        default: Date.now,
        required: true
    },
    noOfGuests: {
        type: Number,
        required: true
    },
    request: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    },
    restaurant: {
        type: mongoose.Schema.ObjectId,
        ref: 'Restaurant',
        required: true,
    }
}), 'Reservations');

const validateReservation = (reservation) => {
    const schema = {
        datetime: Joi.date().required(),
        noOfGuests: Joi.number().required(),
        request: Joi.string().min(5).max(255).required(),
        restaurant: Joi.required()
    };
    return Joi.validate(reservation, schema);
}
 
exports.Reservation = Reservation;
exports.validate = validateReservation;


