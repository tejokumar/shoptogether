/**
 * Created by i043639 on 5/5/15.
 */
'use strict';

angular.module('cart').controller('CartController',['lodash','$scope',
    '$modal','CartService','Authentication', function(_,$scope,$modal,CartService,Authentication){
    $scope.getCart = function(){
        $scope.cart = CartService.cart;
    };
    $scope.removeFromCart = function(product){
        CartService.removeFromCart(product,function(cart){
            $scope.cart = cart;
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
                CartService.cart.contributors = selectedFriends;
                CartService.cart.contributors.push(currentUser);
                CartService.saveCart();
            }
        });
    };
}]);
