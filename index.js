// Requiero librerias y servicios.
const express = require("express");
const authRoutes = require('./routes/authRoutes');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require("./config/keys");
require('./models/User');
require("./services/passport");

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Defino variables.
const app = express(); 
const PORT = process.env.PORT || 5000;

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Defino las rutas, primero van las de autenticacion.
authRoutes(app);
app.get('/', (req, res) => {
  res.send({ hi: "there4" });
});

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
  })
);

app.get(
  '/auth/google/callback', 
  passport.authenticate('google'),
  (req,res) => {
    res.redirect('/surveys');
  }  
);

app.get('/api/logout', (req, res) => {
  res.logout();
  res.send(req.user);
});

app.get('/get/current_user', (req,res) => {
  res.send(req.user);
});

// Mando al servidor escuchar el puerto numero 5000
app.listen(PORT, () => {
  console.log(`Server App listening at http://localhost:${PORT}`);
});
