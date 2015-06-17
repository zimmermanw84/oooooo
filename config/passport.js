// load all the things we need
// load up the user model
var models = require('../models');
var User = require('../models/user');

// load the auth variables
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleAuth = require('../config/auth').googleAuth;

module.exports = function(passport) {
    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        models.user.findOne({ where: { id: id } })
            .then(function(user) {
                done(null, user);
            })
            .error(function(err) {
                console.log("ERROR: ", err);
            })
            // });
    });

    // code for login (use('local-login', new LocalStategy))
    // code for signup (use('local-signup', new LocalStategy))
    // code for facebook (use('facebook', new FacebookStrategy))
    // code for twitter (use('twitter', new TwitterStrategy))

    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
     var gStrategy = new GoogleStrategy({
        clientID : googleAuth.clientID,
        clientSecret : googleAuth.clientSecret,
        callbackURL : googleAuth.callbackURL,
    },
    function(token, refreshToken, profile, done) {
        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        process.nextTick(function() {
            // try to find the user based on their google id
            models.user.findOne( { where: { 'googleID' : profile.id } } )
                .then(function(user) {
                    // console.log("USER", user.dataValues)
                    if (user) return done(null, user);
                    // Fail to find user then create user
                    var newUser = models.user.create({
                      googleID: profile.id,
                      googleToken: token,
                      username:profile.displayName,
                      email: profile.emails[0].value,// pull the first email
                      img: profile.photos[0].value // store first picture url
                    }).then(function(user) {
                        return done(null, user);
                    }).error(function(error) {
                        console.log('Something went wrong. Try again');
                    });
                })
                .error(function() {
                    console.log("ERROR:");
                });

        });

    });
// );
    passport.use(gStrategy);
};
