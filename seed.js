var yelpConfig = require("./config/auth").yelpAuth;

var yelp = require("yelp").createClient({
  consumer_key: yelpConfig.consumerKey,
  consumer_secret: yelpConfig.consumerSecret,
  token: yelpConfig.token,
  token_secret: yelpConfig.tokenSecret
});

yelp.search({term: 'restaurants', location: 'San Francisco, Ca'}, function(error, data) {
    if (error) console.log(error);

    try {
        console.log(data.businesses[0].location);
      // logger(data);
    } catch(e) { console.log("ERROR: ", e) }

});