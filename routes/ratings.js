const express = require('express');
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { Rating, validate } = require('../models/rating');
const { Restaurant } = require('../models/restaurant');
const router = express.Router();
const verifyToken = require('../auth/verifyToken');


router.post('/me', verifyToken, async (req, res) => {    
          // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Insert the new reservation
    Rating.findOneAndUpdate({ user: req.body.user, restaurant: req.body.restaurant },
        req.body, { upsert:true, useFindAndModify: false }, async (err, doc) => {
        if (err) return res.send(500, { error: err });

        const restaurantRatings = await Rating.find({ restaurant: req.body.restaurant });
        let totalRating = 0
        restaurantRatings.map(item=> {
            totalRating += item.rating;
        })
        const overallRating = totalRating/restaurantRatings.length;
        console.log(overallRating)
        Restaurant.findOneAndUpdate({ _id: req.body.restaurant }, { rating: overallRating }, { useFindAndModify: false }, ()=>{
            return res.send("succesfully saved");
        })
    });
});

router.get('/', verifyToken,  async (req, res) => {
 
    let ratings = await Rating.find().populate('user').populate('restaurant');
    res.json(ratings);

});
 
module.exports = router;