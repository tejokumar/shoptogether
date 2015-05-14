angular.module('cart').controller('ModalCartController',['lodash','$scope',
    '$modalInstance', 'Cart',function(_,$scope,$modalInstance,Cart){
        $scope.newCart = new Cart();
        $scope.create = function(){
            $modalInstance.close($scope.newCart);
        };
        $scope.cancel = function(){
            $modalInstance.dismiss('cancel');
        };
    }]);