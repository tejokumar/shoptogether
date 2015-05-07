'use strict';

angular.module('products').controller('ProductsController', ['$rootScope','$scope','$timeout','Products','Cart',function($rootScope,$scope,$timeout,Products,Cart){
    $scope.initializeData = function(){
        $scope.getProducts();
        $scope._getCart();
    };
	$scope.getProducts = function(){
		if($scope.searchText){
			var sText = encodeURIComponent($scope.searchText);
			$scope.products = Products.query({searchText:sText});
		}else {
			$scope.products = Products.query();
		}
	};
    $scope._getCart =  function(){
        Cart.query().$promise.then(function(carts){
            if(carts && carts.length > 0){
                $rootScope.cart = new Cart(carts[0]);
            }else {
                $rootScope.cart = new Cart({
                    products:[]
                });
            }
        });

    };
    $scope.addProductToCart = function(product){
        if(!product.quantity)
            product.quantity = 1;

        $rootScope.cart.products.push(product);
        if($rootScope.cart.cartId){
            $rootScope.cart.$update();
        }else {
            $rootScope.cart.$save(function(response){
                $rootScope.cart = new Cart(response);
            });
        }
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