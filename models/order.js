var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    user:{type:Schema.Types.ObjectId, ref:'User'},
    cart:{type:Object, required:true},
    adress:{type:String, required:true},
    name:{type:String, required:true},
    paymentId:{type:String, required:true}



},{collection:'Order'});

module.exports = mongoose.model('Order', schema);
