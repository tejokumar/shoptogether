'use strict';
/**
*  Module
*
* Description
*/
angular.module('products').controller('ProductsController', ['$scope','Products', function($scope,Products){
	$scope.getProducts = function(){
		if($scope.searchText){
			var sText = encodeURIComponent($scope.searchText);
			$scope.products = Products.query({searchText:sText});
		}else {
			$scope.products = Products.query();
		}
	};
}]);