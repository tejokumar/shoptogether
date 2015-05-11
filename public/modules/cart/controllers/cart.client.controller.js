/**
 * Created by i043639 on 5/5/15.
 */
'use strict';

angular.module('cart').controller('CartController',['$rootScope','$scope','CartService',function($rootScope,$scope,CartService){
    $scope.getCart = function(){
        $scope.cart = CartService.cart;
    };
    $scope.removeFromCart = function(product){
        CartService.removeFromCart(product);
        $scope.getCart();
    };
}]);
