/**
 * Created by i043639 on 5/5/15.
 */
'use strict';

angular.module('cart').controller('CartController',['$rootScope','$scope','$modal','CartService',function($rootScope,$scope,$modal,CartService){
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
                console.log('No of selected friends : '+selectedFriends.length);
            }
        }, function () {
            console.log('Cancelled');
        });
    };
}]);
