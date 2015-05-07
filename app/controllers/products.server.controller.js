'use strict';
var http = require('http'),
    bestBuyKey = '7p7nhhmq6ftt22347pmcz5dt',
    mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Cart = mongoose.model('Cart'),
    _ = require('lodash');
exports.list = function(req,res){
	var searchString = 'iPhone';
	if(req.query && req.query.searchText){
		console.log(req.query.searchText);
		var searchArray = req.query.searchText.split('%20');
		searchString = searchArray.join('&search=');
	}

	var urlOptions = {
		host:'api.remix.bestbuy.com',
		path:'/v1/products(search='+searchString+')?show=sku,name,image,mediumImage,thumbnailImage,largeImage,salePrice&pageSize=15&page=5&apiKey='+bestBuyKey+'&format=json'
	};
	http.request(urlOptions,function(dataResponse){
		var responseString = '';
		dataResponse.on('data',function(chunk){
			responseString += chunk;
		});
		dataResponse.on('end',function(){
			var jsonDataResponse = JSON.parse(responseString);
            if(jsonDataResponse.products){
                var products = jsonDataResponse.products;
                Cart.find().sort('-created').exec(function(err,carts){
                    if(!err && carts){
                        var cart = carts[0];
                        var cartProducts = cart.products;
                        _.forEach(cartProducts,function(cartProduct){
                            var product = _.find(products,function(prdct){
                                return prdct.sku === cartProduct.sku;
                            });
                            if(product){
                                product.isInCart = true;
                            }
                        });
                    }
                    res.json(products);
                });
            }else {
                res.json([]);
            }

		});
	}).end();
};