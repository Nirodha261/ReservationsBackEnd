const express = require('express');
const _ = require('lodash');
const verifyToken = require('../auth/verifyToken');
const { Reservation, validate } = require('../models/reservation');
const router = express.Router();


router.post('/', verifyToken,  async (req, res) => {
    // First Validate The Request
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
        // Insert the new reservation
        const reservation = new Reservation(_.pick(req.body, ['datetime', 'noOfGuests', 'request', 'restaurant']));
        await reservation.save();
        res.send(_.pick(reservation, ['_id', 'datetime', 'noOfGuests', 'request', 'restaurant']));
});

router.get('/', verifyToken,  async (req, res) => {
 
    let reservations = await Reservation.find().populate('restaurant');
    res.json(reservations);

});
 
module.exports = router;