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
      function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        User.findOrCreate({ googleId: profile.id }, function(err, user) {
          return cb(err, user);
        });
      }
    )
  );
};
