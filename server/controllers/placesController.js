const db = require('../../models/placesModel');
require('dotenv').config();

const placesController = {};

placesController.queryGoogle = async (req, res, next) => {
  const { input, location } = req.query;
  console.log('this is the query from the frontend', req.query);

  const encodeInput = encodeURIComponent(input);
  const encodeLocation = encodeURIComponent(location);

  if (!location) {
    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${input}&radius=1000&key=${process.env.PLACESAPI}`
    )
      .then((response) => response.json())
      .then((output) => {
        console.log('these are the results', output.results);
        res.locals.places = output.results;
        return next();
      })
      .catch((err) => console.log(err));
  } else {
    fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${encodeLocation}&query=${input}&radius=500&key=${process.env.PLACESAPI}`
    )
      .then((response) => response.json())
      .then((output) => {
        console.log('these are the results', output.results);
        res.locals.places = output.results;
        return next();
      })
      .catch((error) => {
        err = {
          log:
            'There was an error in the placesController.queryGoogle middleware' +
            error,
          status: 500,
          message: { err: 'There was an unknown server error' },
        };
        return next(err);
      });
  }
};

placesController.getDetails = (req, res, next) => {
  const { place_id } = req.query;

  fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?fields=name%2Cformatted_address%2Cformatted_phone_number%2Cwebsite%2Curl%2Cprice_level%2Creservable%2Cwheelchair_accessible_entrance%2Copening_hours&place_id=${place_id}&key=${process.env.PLACESAPI}`
  )
    .then((response) => response.json())
    .then((output) => {
      res.locals.details = output.result;
      return next();
    })
    .catch((error) => {
      err = {
        log:
          'There was an error in the placesController.queryGoogle middleware' +
          error,
        status: 500,
        message: { err: 'There was an unknown server error' },
      };
      return next(err);
    });
};

module.exports = placesController;
