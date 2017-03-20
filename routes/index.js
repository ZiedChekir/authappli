var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var products = require('../models/products');
var Cart = require('../models/cart');
var util = require('util');


  mongoose.connect('localhost:27017/authapp');

/* GET home page. */

router.get('/', function(req, res, next) {

  products.find(function(err, doc){
    res.render('index', { Products: doc, user: req.user, cart : req.session.cart});
  });
});

router.get('/cart', function(req, res, next) {
  if(!req.session.cart){
    return   res.render('cart',{user: req.user,products : null});

  }
  var cart = new Cart(req.session.cart);
  res.render('cart',{user: req.user,cart : cart, products:cart.generateArray(),totalPrice:cart.totalPrice});

});

router.get('/add-to-cart/:id', function(req, res, next) {

    var productId = req.params.id ;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    products.findById(productId,function(err, product){
        if(err){
          return res.redirect('/');
        }
        cart.add(product,product.id);
          req.session.cart = cart ;
          res.redirect('/')

      });

});


 module.exports = router;
