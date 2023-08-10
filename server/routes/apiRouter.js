const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//controllers
const userController = require('../controllers/userController.js');
const placesController = require('../controllers/placesController');
const actionController = require('../controllers/actionController.js');


router.post('/oauthSignup', userController.oauthSignup, (req, res, next) => {
  res
    .status(201)
    .json({ message: 'User created or retrieved!', user: res.locals.user });
});


// //populate results from user initiated search
router.get('/placeSearch', placesController.queryGoogle, (req, res) => {
  res.status(200).send(res.locals.places);
});

router.get('/placeDetails', placesController.getDetails, (req, res) => {
  res.status(200).send(res.locals.details);
});


// to add global error handler in server.js later

module.exports = router;
