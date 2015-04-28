'use strict';


angular.module('products').config(['$stateProvider',function($stateProvider) {
	$stateProvider.
	state('listProducts',{
		url:'/products',
		templateUrl:'/modules/products/views/list-products.client.view.html'
	});
}]);