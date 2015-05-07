/**
 * Created by i043639 on 5/5/15.
 */
'use strict';

angular.module('cart').controller('CartController',['$rootScope','$scope','Cart',function($rootScope,$scope,Cart){
    $scope.getProducts = function(){
        Cart.query().$promise.then(function(cartData){
            if(cartData && cartData.length > 0){
                $scope.products = cartData[0].products;
            }
        });
    };
}]);
