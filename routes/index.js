var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var products = require('../models/products');
var Cart = require('../models/cart');
  mongoose.connect('localhost:27017/authapp');
/* GET home page. */

router.get('/', function(req, res, next) {
  products.find(function(err, doc){
    res.render('index', { Products: doc,user: req.user });
  });
});


router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id ;
    var cart = new Cart(req.session.cart ? req.session.cart : {});
    console.log(cart + 'first log');
    products.findById(productId,function(err, product){
        if(err){
          return res.redirect('/');
        }
        cart.add(product,product.id);
          req.session.cart = cart ;
          console.log(req.session.cart.storedItem + 'second log');
          res.redirect('/')

      });
});
 module.exports = router;
