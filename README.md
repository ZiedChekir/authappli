# authappli

run `npm install` to install all the dependencies 
it is required to have a Mongo Database running on 27017 port if not you have to configure the port in 

./app.js
/routes/index.js 
/seed/seedProduct.js 
just add `mongoose.connect([db with port]);`


then `npm start`  to run the server 


it s possible to use nodemon by running `nodemon [location to www file ]` location is bin/www 

