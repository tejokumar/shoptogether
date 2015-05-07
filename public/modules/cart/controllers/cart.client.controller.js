/**
 * Created by i043639 on 5/5/15.
 */
'use strict';

angular.module('cart').controller('CartController',['$rootScope','$scope','Cart',function($rootScope,$scope,Cart){
    $scope.getProducts = function(){
        $scope.products = $rootScope.productsInCart;
    };
    console.log('In Cart Controller :');
    $scope.$on('ADD_TO_CART',function(event,args){
        console.log('Adding to cart :');
    });
}]);
