var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var mongoose = require('mongoose');
var csrfProtection = require('csrf');
var Order = require('../models/order');
var Cart = require('../models/cart');
var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn();
var loginOptions = require('../public/javascript/options');

var profile = require('./profile');

//Open connection with the database
mongoose.createConnection('localhost:27017/authapp');

// router.use('/profile', profile);
router.get('/', function(req, res) {
    res.redirect('/user/profile');
});
router.get('/profile', ensureLoggedIn, function(req, res) {
  res.render('user/profile',{user: req.user,info:JSON.parse(req.user._raw)});
  console.log(req.user._raw);
});
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/signup', function(req, res) {

    res.render('user/signup', {messages: req.flash()});
});

router.get('/login', function(req, res, next) {

    res.render('user/login', {options:loginOptions,messages: req.flash()});
});

router.get('/callback', passport.authenticate('auth0', {failureRedirect: '/'}), function(req, res) {
    res.redirect(req.session.returnTo || '/user/profile');
});

module.exports = router;
