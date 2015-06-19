var yelpConfig = require("./config/auth").yelpAuth;
var models = require('./models');

var yelp = require("yelp").createClient({
  consumer_key: yelpConfig.consumerKey,
  consumer_secret: yelpConfig.consumerSecret,
  token: yelpConfig.token,
  token_secret: yelpConfig.tokenSecret
});

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
// var rest = models.restaurant.find({ where: {restaurant_id: 1}, include: [models.menu] })
//   .then(function(rest) {
//     console.log("REST MENU", rest.menus);
// })

// models.menu_type.create({ name: "B FAST" })
  // then(function() {

// })

// models.menu.create({
  // rating: "5.0",
  // restaurant_id: 1,
  // menu_type_id: 1
// }).then(function(menu) {
  // console.log(menu);
// })

// var menu = models.menu.find({ where: {menu_id: 2 }, include: [models.restaurant] })
  // .then(function(menu) {
    // console.log("MENU: REST", menu.restaurant)
    // models.menu_item.find({ where: {menu_id: 2} }).then(function(menu_item) {
      // console.log(menu_item);
    // })
// })

