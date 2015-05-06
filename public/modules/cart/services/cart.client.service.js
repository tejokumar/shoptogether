'use strict';

//Articles service used for communicating with the articles REST endpoints
angular.module('cart').factory('Cart', ['$resource',
    function($resource) {
        return $resource('cart/:cartId', {
            cartId: '@_id'
        }, {
            update: {
                method: 'PUT'
            }
        });
    }
]);