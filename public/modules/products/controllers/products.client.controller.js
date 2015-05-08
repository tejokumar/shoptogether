'use strict';

angular.module('products').controller('ProductsController', ['lodash','$rootScope','$scope','$timeout','Products','Cart',function(_,$rootScope,$scope,$timeout,Products,Cart){

	var getProducts = function(){
		if($scope.searchText){
			var sText = encodeURIComponent($scope.searchText);
			$scope.products = Products.query({searchText:sText});
		}else {
			$scope.products = Products.query();
		}
	};
    var getCart =  function(){
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

    var initializeData = function(){
        getProducts();
        getCart();
    };
    var addProductToCart = function(product){
        if(!product.quantity)
            product.quantity = 1;
        product.isInCart = true;
        $rootScope.cart.products.push(_productForCart(product));
        saveCart();
    };
    var saveCart = function(){
        if($rootScope.cart.cartId){
            $rootScope.cart.$update();
        }else {
            $rootScope.cart.$save(function(response){
                $rootScope.cart = new Cart(response);
            });
        }
    };
    var removeFromCart = function(product){
        delete product.isInCart;
        delete product.quantity;
        _.remove($rootScope.cart.products,function(object){
            return object.sku === product.sku;
        });
        saveCart();
    };
    var _productForCart = function(product){
        if(product){
            return {
                sku:product.sku,
                name:product.name,
                quantity:product.quantity,
                salePrice:product.salePrice,
                thumbnailImage:product.thumbnailImage
            }
        }
    };
    $scope.initializeData = initializeData;
    $scope.addProductToCart = addProductToCart;
    $scope.removeFromCart = removeFromCart;

}]);