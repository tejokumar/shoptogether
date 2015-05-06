'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Cart = mongoose.model('Cart'),
    _ = require('lodash');

/**
 * Create a Cart
 */
exports.create = function(req, res) {
    var cart = new Cart(req.body);
    cart.cartId = mongoose.Types.ObjectId();
    cart.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(cart);
        }
    });
};

/**
 * List of Carts
 */
exports.list = function(req, res) {
    Cart.find().sort('-created').exec(function(err, carts) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(carts);
        }
    });
};