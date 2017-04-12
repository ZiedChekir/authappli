var product = require('../models/products');
var mongoose = require('mongoose');

mongoose.connect('localhost:27017/authapp');

var product = [
  new product({
      imgpath:'http://cdn.edgecast.steamstatic.com/steam/apps/311210/header.jpg?t=1479852239',
      title:'Call of Duty BO3'.toLowerCase(),
      category:'fps',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
      price:30
  }),
  new product({
      imgpath:'http://cdn-uploads.gameblog.fr/images/blogs/3140/173536.jpg',
      title:'grand theft auto 5'.toLowerCase(),
      category:'action',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
      price:50
  }),
  new product({
      imgpath:'https://i.ytimg.com/vi/ND3SPZ3H8AI/maxresdefault.jpg',
      title:'Assasin\'s creed Unity'.toLowerCase(),
      category:'action',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
      price:60
  }),
  new product({
      imgpath:'http://www.w3sh.com/wordpress/wp-content/uploads/2016/10/FIFA_17.jpg',
      title:'Fifa 17'.toLowerCase(),
      category:'Sport',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
      price:40
  }),
  new product({
      imgpath:'https://images7.alphacoders.com/533/533430.jpg',
      title:'h1z1'.toLowerCase(),
      category:'adventure',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
      price:30
  }),

  new product({
      imgpath:'http://media-www-battlefieldwebcore.spark.ea.com/content/battlefield-portal/fr_FR/_global_/_jcr_content/ccm/componentwrapper_0/components/opengraph/ogImage.img.jpg',
      title:'Battlefield 1'.toLowerCase(),
      category:'fps',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
      price:70
  }),
  new product({
      imgpath:'https://www.jvfrance.com/wp-content/uploads/2016/03/Overwatch-1.jpg',
      title:'overwatch'.toLowerCase(),
      category:'fps',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
      price:50
  }),
  new product({
      imgpath:'https://www.vossey.com/userfiles/images/csgo-giveaway.jpg',
      title:'Counter Strike Global offensive'.toLowerCase(),
      category:'fps',
      description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ",
      price:14
  })
  new product({
      imgpath:'https://www.zone-actu.com/wp-content/uploads/RocketLeague.jpg',
      title:'Rocket League'.toLowerCase(),
      category:'sport',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
      price:14
  }),
  new product({
      imgpath:'http://cdn.akamai.steamstatic.com/steam/apps/221100/header.jpg?t=1479997446',
      title:'DayZ'.toLowerCase(),
      category:'adventure',
      description:'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco ',
      price:35
  })

];
var done = 0;
for (var i = 0; i < product.length; i++) {
  console.log(product[i]);
  // for (var b = 0; b < .length; b++) {
  //
  // }
  product[i].save(function(err,result){
    done++
    if (done === product.length){
      mongoose.disconnect();
    }
  });
}
