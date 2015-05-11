'use strict';

/**
 * Module dependencies.
 */
var cart = require('../../app/controllers/cart.server.controller'),
    users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {
    // Cart Routes
    app.route('/cart')
        .get(users.requiresLogin, cart.list)
        .post(users.requiresLogin, cart.create);

    app.route('/cart/:cartId')
        .put(users.requiresLogin, cart.hasAuthorization, cart.update);

    // Finish by binding the cart middleware
    app.param('cartId', cart.cartById);
};