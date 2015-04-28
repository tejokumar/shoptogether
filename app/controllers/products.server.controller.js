'use strict';

exports.list = function(req,res){
	var products = [
			{
				sku:'123',
				name:'Sony 50 Inch LED'
			},
			{
				sku:'124',
				name:'Samsung 50 Inch LED'
			},
			{
				sku:'125',
				name:'LG 50 Inch LED'
			},
			{
				sku:'126',
				name:'Vizio 50 Inch LED'
			}
		];
		res.json(products);
};