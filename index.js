const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const app = express();
const users = require('./routes/users');
const auth = require('./routes/auth');
const restaurants = require('./routes/restaurants');
const restaurantTypes = require('./routes/restaurantTypes');
const reservations = require('./routes/reservations');
const ratings = require('./routes/ratings');
require('dotenv/config');


// Connect to DB
mongoose.connect(process.env.DB_CONNECTION, 
    { 
        useNewUrlParser: true,
        useCreateIndex: true 
    })
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/restaurants', restaurants);
app.use('/api/restaurantTypes', restaurantTypes);
app.use('/api/reservations', reservations);
app.use('/api/ratings', ratings);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));