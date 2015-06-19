var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'OOO' });
});

router.get('/dashboard', function(req, res, next) {
  if (!req.user) res.redirect('/');

  res.user = req.user.dataValues;

  res.render('dashboard', {
    username: req.user.dataValues.username,
    email: req.user.dataValues.email,
    googleID: req.user.dataValues.googleID,
    img: req.user.dataValues.img
  });
});


module.exports = router;