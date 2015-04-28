'use strict';

angular.module('products').factory('Products', ['$resource', function($resource){
	return $resource('/products/:sku',{
		sku:'@_id'
	});
}]);