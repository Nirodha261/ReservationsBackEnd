const mongoose = require('mongoose');

const Restaurant = mongoose.model('Restaurant', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    },
    rating: {
        type: Number,
        default: 0,
        required: true
    },
    type: {
        type: mongoose.Schema.ObjectId,
        ref: 'RestaurantType',
        required: true,
    }
}), 'Restaurants');


 
exports.Restaurant = Restaurant;

