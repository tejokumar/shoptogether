'use strict';
var http = require('http');
var bestBuyKey = '7p7nhhmq6ftt22347pmcz5dt';
exports.list = function(req,res){
	var searchString = 'iPhone';
	if(req.query && req.query.searchText){
		var searchArray = req.query.searchText.split('%2520');
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
			res.json(jsonDataResponse.products);
		});
	}).end();
};