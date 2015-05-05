'use strict';

angular.module('products').controller('ProductsController', ['$rootScope','$scope','Products', function($rootScope,$scope,Products){
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
        $rootScope.$emit('ADD_TO_CART',product);
    };
}]);