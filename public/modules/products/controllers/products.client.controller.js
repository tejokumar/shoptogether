'use strict';
/**
*  Module
*
* Description
*/
angular.module('products').controller('ProductsController', ['$scope','Products', function($scope,Products){
	$scope.getProducts = function(){
		$scope.products = Products.query();
	};
}]);