var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var models = require('../models');

/* GET home page. */

router.get('/restaurants', function(req, res, next) {
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
      res.render('restaurant', { restaurant: rest.dataValues } );
    });
});

router.get('/restaurants/:id/menus', function(req, res, next) {
  var restaurant = models.restaurant.findOne( { where: { restaurant_id: req.params.id }, include: [models.menu] })
    .then(function(rest) {
        models.menu_type.findAll()
          .then(function(types) {
            // Add name from menu_type to menu object
            for (var i = 0; i < types.length; i++) {
              if (rest.menus[i].menu_type_id === types[i].dataValues.menu_type_id) {
                rest.menus[i].name = types[i].dataValues.name;
              }
            }
            res.render('menus', { restaurant: rest.dataValues, menus: rest.menus} );
          });
    });
});

router.get('/restaurants/:restaurant_id/menus/:id', function(req, res, next) {
  var menu = models.menu.findOne( { where: { menu_id: req.params.id }, include: [models.menu_item] })
    .then(function(menu) {
      res.render('menu', {
        restaurant_id: req.params.restaurant_id,
        menu_id: req.params.id,
        menu_items: menu.dataValues.menu_items
      });
        // })
    });
});

// EVEN WITH HIDDEN INPUT TYPE PUT, PUT ROUTE FAILS WILL CHANGE WHEN IO ADD ANGULAR
router.post('/restaurants/:restaurant_id/menus/:menu_id/menu_items/:id', function(req, res, next) {
  if(!req.body.description) res.send("YOU MUST ENTER description!!");

  var menu_item = models.menu_item.findOne({ where: { menu_item_id: req.params.id } })
    .then(function(item) {
      item.updateAttributes({
        description: req.body.description
      })
      .then(function() {
        res.redirect('/restaurants/'+ req.params.restaurant_id +'/menus/' + req.params.menu_id);
      })
      .error(function(err) {
        res.send("FAILED TO UPDATE");
      });
    })
    .error(function(err) {
      res.send("FAILED TO FIND MENU ITEM");
    });
});


module.exports = router;