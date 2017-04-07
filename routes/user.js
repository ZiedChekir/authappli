var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var mongoose = require('mongoose');
var csrfProtection = require('csrf');
var Order = require('../models/order');
var Cart =require('../models/cart');

var profile = require('./profile');
// router.use(csrfProtection);
//Open connection with the database
  mongoose.createConnection('localhost:27017/authapp');


  router.use('/profile',profile);
  router.get('/profile', isLoggedIn, function(req, res) {


  

   });
   router.get('/logout', function(req, res) {
       req.logout();
       res.redirect('/');
   });

  router.use('/',isNotLoggedIn, function(req,res,next){

    next();
  });


router.get('/signup', function(req,res){
  // res.render('user/signup', { messages: req.flash(), csrfToken:req.csrfToken()});
  res.render('user/signup', { messages: req.flash()});
});

router.get('/login', function(req, res, next) {
  res.render('user/login', {messages: req.flash()});
});



 // =====================================
 // LOGOUT ==============================
 // =====================================
 router.get('/logout', function(req, res) {
     req.logout();
     res.redirect('/');
 });


router.post('/signup', passport.authenticate('local-signup', {
 // redirect to the secure profile section
failureRedirect : '/user/signup', // redirect back to the signup page if there is an error
failureFlash : true // allow flash messages
}),function(req,res,next){
  if(req.session.chekoutUrl){
    var chekoutUrl = req.session.chekoutUrl;
    req.session.chekoutUrl = null;
    res.redirect(chekoutUrl);
  }else{
    res.redirect('/user/login');
  }

});

router.post('/login', passport.authenticate('local-login', {
 // redirect to the secure profile section
 failureRedirect : '/user/login', // redirect back to the signup page if there is an error
 failureFlash : true // allow flash messages
}),
function(req,res,next){
  if(req.session.chekoutUrl){
    var chekoutUrl = req.session.chekoutUrl;
    req.session.chekoutUrl = null;
    res.redirect(chekoutUrl);
  }else{
    res.redirect('/user/profile');
  }
});

function isLoggedIn(req, res, next) {
// if user is authenticated in the session, carry on
if (req.isAuthenticated())
   return next();
// if they aren't redirect them to the home page
res.redirect('/');
}
function isNotLoggedIn(req, res, next) {
// if user is authenticated in the session, carry on
if (!req.isAuthenticated())
   return next();
// if they aren't redirect them to the home page
res.redirect('/');
}

 module.exports = router;
