const User = require('../../models/userModel');
const bcrypt = require('bcryptjs');
const db = require('../../models/placesModel');

const UserController = {
  // added below oauthSignup method
  oauthSignup: async (req, res, next) => {
    try {
      const { email, displayName } = req.body;

      if (!email || !displayName) {
        const err = new Error('Email or Display Name missing');
        return next(err);
      }

      // check if the user already exists
      let user = await User.findOne({ email: email });

      if (!user) {
        user = await User.create({
          email: email,
          displayName: displayName,
        });
      }

      res.locals.user = user;
      return next();
    } catch (error) {
      const err = new Error(
        'Error in UserController.oauthSignup: ' + error.message
      );
      return next(err);
    }
  },

};

module.exports = UserController;
