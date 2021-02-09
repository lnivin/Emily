const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

// Serialize instance id
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize instance id
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  })
});

// Google authentication
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback", 
      proxy: true
    },
    async function (accessToken, refreshToken, profile, done) {
      const existingUser = await User.findOne({ googleId: profile.id })
      if (existingUser) {
        // User already exist. Don't create again
        return done(null, existingUser);
      }
      // Create a new record for the given user id.
      const newUser = await new User({
        googleId: profile.id,
        googleName: profile.displayName,
      }).save()
      done(null, newUser);
    }
  )
);
