const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
var GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const userModel = require("./model/userModel");
const keys = require("./keys");
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;
module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      userModel
        .findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
  passport.use(
    new GoogleStrategy(
      {
        clientID:
          "352999401573-jcep0lnj6ujsubt1kanrted2bv96e307.apps.googleusercontent.com",
        clientSecret: "NDZEvxFKhQpoijBBXX-_Gzcl",
        callbackURL: "http://localhost:5000/api/users/auth/google/callback"
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile);
        userModel.findOne({ googleId: profile.id }).then((currentUser) => {
          if (currentUser) {
            // already have this user
            console.log('user is: ', currentUser);
            done(null, currentUser);
          } else {
            // if not, create user in our db
            console.log('new user');
            //add user in mongoDB acording to your user model...
            new userModel({
              //for example
              // name: profile.displayName,
              // avatar: profile.photos[0].value,
              // email: profile.emails[0].value,
            }).save().then((newUser) => {
              console.log('created new user: ', newUser);
              done(null, newUser);
            });
          }
        })
      }));
}
