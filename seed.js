var yelpConfig = require("./config/auth").yelpAuth;
var models = require('./models');

var yelp = require("yelp").createClient({
  consumer_key: yelpConfig.consumerKey,
  consumer_secret: yelpConfig.consumerSecret,
  token: yelpConfig.token,
  token_secret: yelpConfig.tokenSecret
});

// yelp.search({term: 'restaurants', location: 'San Francisco, Ca'}, function(error, data) {
//     if (error) console.log(error);

//     try {
//         models.restaurant.create({
//           name: data.businesses[0].name,
//           description: data.businesses[0].categories[0][0],
//           phone_number: data.businesses[0].phone,
//           address_1: data.businesses[0].location.address[0],
//           city: data.businesses[0].location.city,
//           state: data.businesses[0].location.state_code,
//           zipcode: data.businesses[0].location.postal_code,
//           restaurant_img: data.businesses[0].image_url,
//           rating: data.businesses[0].rating,
//           latitude: data.businesses[0].location.coordinate.latitude,
//           longitude: data.businesses[0].location.coordinate.longitude
//         }).then(function(rest) {
//           console.log("REST: ", rest);
//         })

//         // console.log(data.businesses[0]);
//         // console.log(data.businesses[0].location.city);
//       // logger(data);
//     } catch(e) { console.log("ERROR: ", e) }
// });

// var rest = models.restaurant.find({ where: {restaurant_id: 1}, include: [models.menu] })
//   .then(function(rest) {
//     console.log( rest.menus);
// })

var menu = models.menu.find({ where: {menu_id: 4 }, include: [models.restaurant] })
  .then(function(menu) {
    console.log(menu.restaurant)
})

// var menu = models.menu.create({
//   rating: "5.0",
//   restaurant_id: 1,
//   menu_type_id: 1
// }).then(function(menu) {
//   console.log(menu);
// })
