'use strict';

angular.module('products').factory('Products', ['$resource', function($resource){
	return $resource('/products?searchText=:searchText',{
		searchText:'@searchText'
	});
}]);