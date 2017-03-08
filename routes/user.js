var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var mongoose = require('mongoose');
var csrfProtection = require('csrf');
// router.use(csrfProtection);
//Open connection with the database
  mongoose.createConnection('localhost:27017/authapp');

router.get('/signup',function(req,res){
  // res.render('user/signup', { messages: req.flash(), csrfToken:req.csrfToken()});
  res.render('user/signup', { messages: req.flash()});
});

router.get('/login', function(req, res, next) {
  res.render('user/login', {messages: req.flash()});
});

router.get('/profile', isLoggedIn, function(req, res) {
     res.render('user/profile', {
         user : req.user
     });
 });

 // =====================================
 // LOGOUT ==============================
 // =====================================
 router.get('/logout', function(req, res) {
     req.logout();
     res.redirect('/');
 });


router.post('/signup', passport.authenticate('local-signup', {
successRedirect : '/user/profile', // redirect to the secure profile section
failureRedirect : '/user/signup', // redirect back to the signup page if there is an error
failureFlash : true // allow flash messages
}));

router.post('/login', passport.authenticate('local-login', {
 successRedirect : '/user/profile', // redirect to the secure profile section
 failureRedirect : '/user/login', // redirect back to the signup page if there is an error
 failureFlash : true // allow flash messages
}));

function isLoggedIn(req, res, next) {
// if user is authenticated in the session, carry on
if (req.isAuthenticated())
   return next();
// if they aren't redirect them to the home page
res.redirect('/');
}

 module.exports = router;
