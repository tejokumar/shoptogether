/**
 * Created by i043639 on 5/5/15.
 */
'use strict';

angular.module('cart').controller('CartController',['lodash','$scope',
    '$modal','CartService','Cart','Authentication', function(_,$scope,$modal,CartService,Cart,Authentication){
    $scope.initializeCarts = function(){
        CartService.getCarts(function(){
            $scope.allCarts = CartService.allCarts;
            $scope.cart = CartService.cart;
        });
    };
    $scope.removeFromCart = function(product){
        CartService.removeFromCart(product,function(cart){
            $scope.cart = cart;
        });

    };
    $scope.saveCart   = function(){
        CartService.cart = $scope.cart;
        CartService.saveCart();
    };
    $scope.openNewCartPopup = function(){
        $scope.newCart = new Cart({
            cartType:'PRIVATE',
            products:[]
        });
        var modalInstance = $modal.open({
            templateUrl: 'modules/cart/views/new-cart.client.view.html',
            controller: 'ModalCartController',
            size:'sm'
        });
        modalInstance.result.then(function (newCart) {
            CartService.saveCart(newCart,function(){
                $scope.allCarts = CartService.allCarts;
            });
        });
    };
    $scope.openToShare = function(){
        var modalInstance = $modal.open({
            templateUrl: 'modules/users/views/user-friends.client.view.html',
            controller: 'UserController',
            size:'lg'
        });
        modalInstance.result.then(function (selectedFriends) {
            if(selectedFriends){
                var currentUser = _.find(CartService.cart.contributors,function(contributor){
                    return contributor.username === Authentication.user.username;
                });
                $scope.cart.contributors = selectedFriends;
                $scope.cart.contributors.push(currentUser);
            }
        });
    };
}]);
