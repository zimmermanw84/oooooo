var express = require('express');
var passport = require('passport');
var router = express.Router();
var User = require('../models/user');
var db = require("../models/index");


// Would totally make session routes for REST convention.
router.post('/users/logout', function(req, res) {
  req.session = null;
  req.logout();
  res.redirect('/');
});

// =====================================
// GOOGLE ROUTES =======================
// =====================================
// send to google to do the authentication
// profile gets us their basic information including their name
// email gets their emails
router.post('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']
  })
);

// the callback after google has authenticated the user
router.get('/auth/google/callback',
    passport.authenticate('google', { successRedirect : '/dashboard', failureRedirect : '/' })
);


module.exports = router;
