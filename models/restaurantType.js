const mongoose = require('mongoose');


const RestaurantType = mongoose.model('RestaurantType', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 50
    }
}), 'RestaurantTypes');

 
exports.RestaurantType = RestaurantType;

