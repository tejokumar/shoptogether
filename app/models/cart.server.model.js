'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Cart Schema
 */
var CartSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    products:[],
    cartId: {
        type: String,
        default: mongoose.Types.ObjectId()
    }
});

mongoose.model('Cart', CartSchema);