var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var products = require('../models/products');

  mongoose.connect('localhost:27017/authapp');
/* GET home page. */

      router.get('/', function(req, res, next) {
        products.find(function(err, doc){
          res.render('index', { Products: doc,user: req.user });
        });
      });


 module.exports = router;
