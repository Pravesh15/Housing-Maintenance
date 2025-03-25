const passport = require('passport');
const { User } = require('../models/userModel');

module.exports = function(passport) {
    passport.use(User.createStrategy());
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
};
