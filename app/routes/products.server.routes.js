'use strict';

var products = require('../../app/controllers/products.server.controller.js');

module.exports = function(app){
	app.route('/products')
		.get(products.list);
};