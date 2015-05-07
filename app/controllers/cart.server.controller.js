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
 * Update a cart
 */
exports.update = function(req, res) {
    var cart = req.cart;

    cart = _.extend(cart, req.body);

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
 * Cart middleware
 */
exports.cartById = function(req, res, next, id) {
    Cart.findById(id).exec(function(err, cart) {
        if (err) return next(err);
        if (!cart) return next(new Error('Failed to load cart ' + id));
        req.cart = cart;
        next();
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