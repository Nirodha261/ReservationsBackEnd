const express = require('express');
const verifyToken = require('../auth/verifyToken');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { Restaurant } = require('../models/restaurant');
const router = express.Router();


router.get('/', verifyToken,  async (req, res) => {
 
    let restaurants = await Restaurant.find().populate('type');
    res.json(restaurants);

});
 
module.exports = router;