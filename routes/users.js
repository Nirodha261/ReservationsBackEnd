const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { User, validateUser } = require('../models/user');
const router = express.Router();
const config = require('../config');

router.post('/', async (req, res) => {
    // First Validate The Request
    const { error } = validateUser(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
 
    // Check if this user already exisits
    let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        // Insert the new user if they do not exist yet
        user = new User(_.pick(req.body, ['fname', 'lname', 'email', 'password']));
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        const token = jwt.sign({ _id: user._id }, config.secret);
        res.header('x-auth-token', token).send(_.pick(user, ['_id', 'fname', 'lname', 'email']));
    }
});
 
module.exports = router;