var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var products = require('../models/products');
var Cart = require('../models/cart');
var util = require('util');
var Order = require('../models/order');


  mongoose.connect('localhost:27017/authapp');


router.get('/', function(req, res, next) {

  var successMsg = req.flash('success')[0];
  var query = {};
  if(req.query.search){
    query.title = req.query.search;
  }
  if(req.query.category){
    query.category = req.query.category;
  }


if(!query.title && !query.category  )
{
    products.find(function(err, doc){
      res.render('index', {
         Products: doc,
         successMessages:successMsg

       });
    });
}else{
//if There is title and no category specified
  if(query.title && query.category === 'none'){

    products.find({title:query.title},function(err, doc){
      res.render('index', {
         Products: doc,
         successMessages:successMsg

       });
    });
  }
  //if There is category and no title specified
    if(!query.title && query.category){
      console.log('category and none title');
      products.find({category:query.category},function(err, doc){
        res.render('index', {
           Products: doc,
           successMessages:successMsg

         });
      });
    }
    //if There is category and no title specified
      if(query.title && query.category){
        console.log('category and  title');
        products.find({title:query.title,category:query.category},function(err, doc){
          res.render('index', {
             Products: doc,
             successMessages:successMsg

           });
        });
      }

}




});
router.get('/login', function(req, res, next) {

res.redirect('/user/login');
});

router.get('/cart', function(req, res, next) {
  if(!req.session.cart){
    return   res.render('cart',{products : null});

  }
  var cart = new Cart(req.session.cart);
  res.render('cart',{ products:cart.generateArray(),totalPrice:cart.totalPrice});

});

router.get('/reduce/:id', function(req, res, next) {
  var productId = req.params.id ;
  var cart = new Cart(req.session.cart ? req.session.cart : {});
  cart.reduceByOne(productId);
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

router.get('/checkout', function(req, res, next) {
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
router.post('/search',function(req,res,next){
  var value= req.body.search;
  var category = req.body.category;
  var filter = req.body.filter;
console.log(filter +  category + value);
  res.redirect('/?search='+value+'&category='+category+'&filter='+filter);
});

 module.exports = router;
