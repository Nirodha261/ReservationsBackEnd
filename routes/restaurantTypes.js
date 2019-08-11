const express = require('express');
const jwt = require('jsonwebtoken');
const verifyToken = require('../auth/verifyToken');
const _ = require('lodash');
const { RestaurantType } = require('../models/restaurantType');
const router = express.Router();

router.get('/', verifyToken,  async (req, res) => {
 
    let restaurantType = await RestaurantType.find();
    res.json(restaurantType);

});
 
module.exports = router;