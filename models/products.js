var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  imgpath:{type:String, required:true},
  title:{type:String, required:true},
  description:{type:String, required:true},
  price:{type:Number, required:true}
},{collection:'product'});

module.exports = mongoose.model('product', schema);
