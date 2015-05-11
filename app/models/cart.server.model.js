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
    owner: {
        type: String,
        trim:true
    },
    cartType: {
        type: String,
        default: 'PRIVATE'
    },
    contributors:[],
    products:[],
    cartId: {
        type: String,
        default: mongoose.Types.ObjectId()
    }
});

mongoose.model('Cart', CartSchema);