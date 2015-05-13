'use strict';

angular.module('users').controller('UserController',['lodash','$scope','$modalInstance','Users',function(_,$scope,$modalInstance,Users){
    $scope.friends = Users.friends();
    $scope.share = function () {
        var selectedFriends = _.filter($scope.friends,function(friend){
            return friend.selected;
        });
        $modalInstance.close(selectedFriends);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);