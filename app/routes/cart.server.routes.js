'use strict';

/**
 * Module dependencies.
 */
var cart = require('../../app/controllers/cart.server.controller');

module.exports = function(app) {
    // Cart Routes
    app.route('/cart')
        .get(cart.list)
        .post(cart.create);

    app.route('/cart/:cartId')
        .put(cart.update);

    // Finish by binding the article middleware
    app.param('cartId', cart.cartById);
};