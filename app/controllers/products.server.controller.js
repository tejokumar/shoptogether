'use strict';
var http = require('http');
var bestBuyKey = '7p7nhhmq6ftt22347pmcz5dt';
exports.list = function(req,res){

	var urlOptions = {
		host:'api.remix.bestbuy.com',
		path:'/v1/products(longDescription=iPhone*|sku=7619002)?show=sku,name&pageSize=15&page=5&apiKey='+bestBuyKey+'&format=json'
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