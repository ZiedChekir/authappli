var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var products = require('../models/products');
var Cart = require('../models/cart');
var util = require('util');
var Order = require('../models/order');


  mongoose.connect('localhost:27017/authapp');

/* GET home page. */

router.get('/', function(req, res, next) {
var successMsg = req.flash('success')[0];
  products.find(function(err, doc){
    res.render('index', {
       Products: doc,
       user: req.user,
       cart : req.session.cart,
       successMessages:successMsg

     });
  });
});

router.get('/cart', function(req, res, next) {
  if(!req.session.cart){
    return   res.render('cart',{user: req.user,products : null});

  }
  var cart = new Cart(req.session.cart);
  res.render('cart',{user: req.user,cart : cart, products:cart.generateArray(),totalPrice:cart.totalPrice});

});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id ;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
if(cart.items[productId].qty <= 0)
  delete
  req.session.cart = cart;
  res.redirect('/cart');

});
router.get('/remove/:id', function(req, res, next) {
  var productId = req.params.id ;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.removeAll(productId);
  req.session.cart = cart;
  res.redirect('/cart');

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

router.get('/checkout',isLoggedIn, function(req, res, next) {
  if(!req.session.cart)
    return res.redirect('/cart');
  var errorMsg = req.flash("error")[0];
  res.render('checkout',{total:req.session.cart.totalPrice,errorMsg:errorMsg, noError:!errorMsg})
});

router.post('/checkout', function(req, res, next) {
  if(!req.session.cart)
    return res.redirect('/cart');

    var stripe = require("stripe")("sk_test_qTXjlTbNEyhQKbD0AKS30IVT");
    var cart = req.session.cart;

  stripe.charges.create({
    amount: cart.totalPrice * 100,
    currency: "usd",
    source: req.body.stripeToken, // obtained with Stripe.js
    description: "creating charge"
  }, function(err, charge) {
    // asynchronously called
    if(err){
      req.flash('error',err.message);
      return res.redirect('/checkout');
    }
    var order = new Order({
      user: req.user,
      cart:cart,
      adress:req.body.adress,
      name:req.body.name,
      paymentId:charge.id
    });
    order.save(function(err,result){
      req.flash("success", 'succesfully bought games');
      req.session.cart = null;
      res.redirect('/');
    })
  });
});

function isLoggedIn(req, res, next) {
// if user is authenticated in the session, carry on
if (req.isAuthenticated())
   return next();
// if they aren't redirect them to the home page
req.session.chekoutUrl = req.url;
console.log(req.session.chekoutUrl);
res.redirect('/user/login');
}
 module.exports = router;
