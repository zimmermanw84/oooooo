var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var models = require('../models');

/* GET home page. */

router.get('/restaurants', function(req, res, next) {
  // console.log(req.user)

  var restaurants = models.restaurant.findAll()
    .then(function(rests) {
      res.render('restaurants', {
        restaurants: rests,
     });
    })
    .error(function() {
      console.log("ERROR! IN restaurants");
    });
});

router.get('/restaurants/:id', function(req, res, next) {
  var restaurant = models.restaurant.findOne( { where: { restaurant_id: req.params.id } })
    .then(function(rest) {
    console.log("MADE IS", rest.dataValues)
      res.render('restaurant', { restaurant: rest.dataValues } );
    });
});

router.get('/restaurants/:id/menus', function(req, res, next) {
  var restaurant = models.restaurant.findOne( { where: { restaurant_id: req.params.id }, include: [models.menu] })
    .then(function(rest) {

      res.render('menus', { restaurant: rest.dataValues, menus: rest.menus } );
    });
});

module.exports = router;