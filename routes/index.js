var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */

      router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
      });

      router.get('/login', function(req, res, next) {
        res.render('login', {messages:req.flash('loginMessage'),hasErorrs:req.flash('loginMessage').length !=0});
      });


      router.get('/signup',function(req,res){
        res.render('signup', { messages: req.flash('signupMessage'),hasErorrs:req.flash('signupMessage').length != 0});
      });
      //router.post('/signup', do all our passport stuff here);
      router.get('/profile', isLoggedIn, function(req, res) {
           res.render('profile', {
               user : req.user // get the user out of session and pass to template
           });
       });

       // =====================================
       // LOGOUT ==============================
       // =====================================
       router.get('/logout', function(req, res) {
           req.logout();
           res.redirect('/');
       });

 function isLoggedIn(req, res, next) {

     // if user is authenticated in the session, carry on
     if (req.isAuthenticated())
         return next();

     // if they aren't redirect them to the home page
     res.redirect('/');
 }
 router.post('/signup', passport.authenticate('local-signup', {
     successRedirect : '/profile', // redirect to the secure profile section
     failureRedirect : '/signup', // redirect back to the signup page if there is an error
     failureFlash : true // allow flash messages
 }));
 
 router.post('/login', passport.authenticate('local-login', {
       successRedirect : '/profile', // redirect to the secure profile section
       failureRedirect : '/login', // redirect back to the signup page if there is an error
       failureFlash : true // allow flash messages
   }));

 module.exports = router;
