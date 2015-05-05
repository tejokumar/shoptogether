'use strict';

angular.module('products').controller('ProductsController', ['$rootScope','$scope','$timeout','Products', function($rootScope,$scope,$timeout,Products){
    $rootScope.productsInCart = [];
	$scope.getProducts = function(){
		if($scope.searchText){
			var sText = encodeURIComponent($scope.searchText);
			$scope.products = Products.query({searchText:sText});
		}else {
			$scope.products = Products.query();
		}
	};
    $scope.addProductToCart = function(product){
        alert(product.name +" : "+product.quantity);
        if(!product.quantity)
            product.quantity = 1;
        $rootScope.productsInCart.push(product);
        $timeout(function(){
            $scope.products = $scope.products;
        },0);
        $rootScope.$emit('ADD_TO_CART',product);
    };
    $scope.isProductInCart = function(product){
        for(var prod in $rootScope.productsInCart){
            if(prod.sku === product.sku){
                return true;
            }
        }
        return false;
    };
}]);