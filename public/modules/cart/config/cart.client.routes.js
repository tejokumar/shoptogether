/**
 * Created by i043639 on 5/5/15.
 */
'use strict';

angular.module('cart').config(['$stateProvider',function($stateProvider){
    $stateProvider.
        state('cart',{
            url:'/cart',
            templateUrl:'/modules/cart/views/cart.client.view.html'
        }).
        state('carts',{
            url:'/carts',
            templateUrl:'/modules/cart/views/list-cart.client.view.html'
        });
}]);