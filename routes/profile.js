var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var csrfProtection = require('csrf');
var Order = require('../models/order');
var Cart =require('../models/cart');

router.get('/',isLoggedIn,function(req,res){
  res.render('user/profile', {

      accountSettings:true
  });
});
router.get('/orders',isLoggedIn,function(req,res){
  Order.find({user:req.user},function(err, orders){
    if(err)
      return res.write(err);
    var cart;

    orders.forEach(function(order){
      cart = new Cart(order.cart);
      order.item = cart.generateArray();
    });
    res.render('user/profile', {

        orders: orders
    });
  });

});




function isLoggedIn(req, res, next) {
// if user is authenticated in the session, carry on
if (req.isAuthenticated())
   return next();
// if they aren't redirect them to the home page
res.redirect('/');
}






 module.exports = router;
