'use strict';

angular.module('products').controller('ProductsController', ['lodash','$rootScope','$scope','$timeout',
          'Products','CartService','Authentication',function(_,$rootScope,$scope,$timeout,Products,CartService,Authentication){

	var getProducts = function(){
		if($scope.searchText){
			var sText = encodeURIComponent($scope.searchText);
			$scope.products = Products.query({searchText:sText});
		}else {
			$scope.products = Products.query();
		}
	};

    var initializeData = function(){
        getProducts();
    };
    var addProductToCart = function(product){
        CartService.addProductToCart(product);
    };

    var removeFromCart = function(product){
        CartService.removeFromCart(product);
    };
    $scope.initializeData = initializeData;
    $scope.addProductToCart = addProductToCart;
    $scope.removeFromCart = removeFromCart;

}]);