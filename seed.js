var yelpConfig = require("./config/auth").yelpAuth;
var locuConfig = require("./config/auth").locuAuth;
var models = require('./models');
var request = require('request');
var http = require('http');
// FAKE DATA
var chance = require('chance').Chance();

// YELP CLIENT
var yelp = require("yelp").createClient({
  consumer_key: yelpConfig.consumerKey,
  consumer_secret: yelpConfig.consumerSecret,
  token: yelpConfig.token,
  token_secret: yelpConfig.tokenSecret
});

// LOCU OPTIONS: WIP GETTING BAD REQUEST ERROR The /v1_0/menu_item/search/ API endpoint is permanently disabled. See https://dev.locu.com/documentation/

// var locuOptions = {
//   host: 'https://api.locu.com',
//   path: '/v1_0/venue/search/?name=PianoFight&locality=San%20Francisco&api_key=' + locuConfig.apiKey,
//   method: 'post'
// };

request(
  'https://api.locu.com/v2/venue/search/?locality=San%20Francisco&api_key=' + locuConfig.apiKey,
  function(err, res, body) {
    if (err) throw(err)
    console.log(res, body);
  });

// var req = http.request(locuOptions, function(res) {
//   // var str = '';

//   console.log(res)
//   // res.on('data', function(chunk) {
//   //   console.log(chunk)
//   //   str += chunk;
//   // });

//   res.on('error', function(err) {
//     console.log(err)
//   })

//   // res.on('end', function() {
//   //   console.log(str);
//   // })
// })

// req.on('error', function(err) {
//   console.log(err)
// })

// req.write("hello world!");
// req.end();

// #################################################################################


// LOAD 10 RESTAURANTS

var seedRestaurants = function() {
  yelp.search({term: 'restaurants', location: 'San Francisco, Ca'}, function(error, data) {
    if (error) console.log(error);

    for (var i = 0; i < 10; i++) {
        try {
            models.restaurant.create({
              name: data.businesses[i].name,
              description: data.businesses[i].categories[0][0],
              phone_number: data.businesses[i].phone,
              address_1: data.businesses[i].location.address[0],
              city: data.businesses[i].location.city,
              state: data.businesses[i].location.state_code,
              zipcode: data.businesses[i].location.postal_code,
              restaurant_img: data.businesses[i].image_url,
              rating: data.businesses[i].rating,
              latitude: data.businesses[i].location.coordinate.latitude,
              longitude: data.businesses[i].location.coordinate.longitude
            }).then(function(rest) {
              console.log("REST: ", rest);
            });
        } catch(e) { console.log("ERROR: ", e) }
    }
  });
}

var seedMenuItems = function() {
  // GRAB RESTAURANTS
  models.menu.findAll()
    .then(function(menu) {

      // EACH MENU
      for (var i = 0; i < menu.length; i++) {

      // ADD 10 MENU ITEMS
        for (var ii = 0; ii < 10; ii++) {

          models.menu_item.create({
            menu_id: menu[i].dataValues.menu_id,
            description: chance.sentence(),
            name: chance.word(),
            price: chance.natural({min: 1, max: 20}).toString(),
            rating: chance.natural({min: 1, max: 5}).toString(),
            item_img: 'https://placeimg.com/125/125/any'
          })

        }

      }

    })
};

// CREAT MENU TYPES

var createMenuTypes = function() {

  var types = ["Breakfast", "Lunch", "Dinner"]

  for (var i = 0; i < types.length; i++) {
    models.menu_type.create({
      name: types[i]
    }).then(function(menu_type) {
      console.log(menu_type);
    });
  }
};

// CREATE MENU

var createMenu = function(restaurants) {

  // Mock Menu types, only 3 at the moment
  var menuTypeIDs = [1,2,3];

  for(var ii = 0; ii < menuTypeIDs.length; ii++) {
    for(var i = 0; i < restaurants.length; i++) {

      models.menu.create({
        restaurant_id: restaurants[i].dataValues.restaurant_id,
        menu_type_id: menuTypeIDs[ii],
        rating: (Math.floor(Math.random() * 5) + 1).toString()
      })
    }
  }
};



// 4 STAGE SEEDING

// 1
// seedRestaurants();

// 2
// createMenuTypes();

// 3
// var rest = models.restaurant.findAll()
//   .then(function(rest) {
//     createMenu(rest);
// });

// 4
// seedMenuItems();

